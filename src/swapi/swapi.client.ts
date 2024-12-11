import { RedisService } from '@liaoliaots/nestjs-redis';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

// todo: refactor deprecated toPromise()
@Injectable()
export class SwapiClient {
  private readonly baseUrl = 'https://swapi.dev/api/';

  private readonly dictionary = {
    films: { people: 'characters' },
    starships: { people: 'pilots' },
    vehicles: { people: 'pilots' },
    planets: { people: 'residents' },
    species: { planets: 'homeworld' },
    people: { planets: 'homeworld' },
  };

  private readonly ttlSeconds = process.env.CACHE_TTL_SECONDS

  private readonly redis: Redis | null;

  constructor(private readonly httpService: HttpService, private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrNil();
  }

  async getResource<T>(
    endpoint: string,
    search?: string,
    filter?: { filterType: string; filterValue: string },
  ): Promise<T[]> {
    if (filter) {
      return this.fetchFilteredResources<T>(endpoint, filter.filterType, filter.filterValue);
    }

    return this.fetchAllPages<T>(endpoint, { search });
  }

  async getResourceById<T>(endpoint: string, id: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}/${id}/`;
    return this.fetchResourceByUrl<T>(url);
  }

  private async fetchAllPages<T>(endpoint: string, params?: Record<string, any>): Promise<T[]> {
    const results: T[] = [];
    let nextUrl: string | null = `${this.baseUrl}${endpoint}`;

    while (nextUrl) {
      const response = await this.fetchResourceByUrl<SwapiPagedResponse<T>>(nextUrl, params);
      results.push(...response.results);
      nextUrl = response.next;
    }

    return results;
  }

  private async fetchFilteredResources<T>(endpoint: string, filterType: string, filterValue: string): Promise<T[]> {
    const relatedResource = await this.getResourceById(filterType, filterValue);

    if (!relatedResource) {
      throw new Error(`Invalid filter: ${filterType} with value ${filterValue}`);
    }

    // Match different names for resource references, like 'characters' for people in films
    // Species' planets reference ('homeworld') is not an array
    const relatedLinks: string[] | string = relatedResource[this.dictionary[filterType][endpoint] ?? endpoint];
    if (relatedLinks instanceof Array) {
      return await Promise.all(relatedLinks.map((link) => this.fetchResourceByUrl<T>(link)));
    } else {
      return [await this.fetchResourceByUrl<T>(relatedLinks)];
    }
  }

  private async fetchResourceByUrl<T>(url: string, params?: Record<string, any>): Promise<T> {
    let cachedResponse: T = null;
    
    if (this.redis) {
      cachedResponse = JSON.parse(await this.redis.get(url));
    }

    if (cachedResponse) {
      return cachedResponse;
    }
    
    try {
      const response = await this.httpService.get(url, { params }).toPromise();

      if (this.redis) {
        await this.redis.set(url, JSON.stringify(response.data), 'EX', this.ttlSeconds);
      }
      
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}

interface SwapiPagedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
