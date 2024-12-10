import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

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

  constructor(private readonly httpService: HttpService) {}

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

  private async fetchAllPages<T>(endpoint: string, params?: Record<string, any>): Promise<T[]> {
    const results: T[] = [];
    let nextUrl: string | null = `${this.baseUrl}${endpoint}`;

    while (nextUrl) {
      const response = await this.httpService.get(nextUrl, { params }).toPromise();
      results.push(...response.data.results);
      nextUrl = response.data.next;
    }

    return results;
  }

  private async fetchFilteredResources<T>(endpoint: string, filterType: string, filterValue: string): Promise<T[]> {
    const relatedResource = await this.fetchResourceById(filterType, filterValue);

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

  async fetchResourceById<T>(endpoint: string, id: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}/${id}/`;
    return this.fetchResourceByUrl<T>(url);
  }

  private async fetchResourceByUrl<T>(url: string): Promise<T> {
    try {
      const response = await this.httpService.get(url).toPromise();
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }
}