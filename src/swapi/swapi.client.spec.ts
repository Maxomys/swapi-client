import { RedisService } from '@liaoliaots/nestjs-redis';
import { HttpService } from '@nestjs/axios';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { SwapiClient } from './swapi.client';

describe('SwapiClient', () => {
  let client: SwapiClient;
  let httpService: HttpService;
  let redisService: RedisService;

  const mockApiResponses = {
    people: {
      page1: {
        data: {
          count: 2,
          next: 'https://swapi.dev/api/people/?page=2',
          previous: null,
          results: [{ name: 'Luke Skywalker' }],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
      page2: {
        data: {
          count: 2,
          next: null,
          previous: 'https://swapi.dev/api/people/?page=1',
          results: [{ name: 'Darth Vader' }],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
      lukeSkywalker: {
        data: {
          name: 'Luke Skywalker',
          films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
    },
    films: {
      aNewHope: {
        data: { title: 'A New Hope' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
      theEmpireStrikesBack: {
        data: { title: 'The Empire Strikes Back' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
    },
    species: {
      human: {
        data: {
          name: 'Human',
          homeworld: 'https://swapi.dev/api/planets/9/',
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
    },
    planets: {
      coruscant: {
        data: { name: 'Coruscant' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      },
    },
    notFound: {
      data: {},
      status: 404,
      statusText: 'Not Found',
      headers: {},
      config: {} as any,
    },
  };

  async function createTestingModule(mockRedisClient: any) {
    return await Test.createTestingModule({
      providers: [
        SwapiClient,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: RedisService,
          useValue: {
            getOrNil: jest.fn().mockReturnValue(mockRedisClient),
          },
        },
      ],
    }).compile();
  }

  beforeEach(async () => {
    const module = await createTestingModule(null);

    client = module.get<SwapiClient>(SwapiClient);
    httpService = module.get<HttpService>(HttpService);
    redisService = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(client).toBeDefined();
  });

  describe('getResource', () => {
    it('should fetch all pages of a resource without filter', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(mockApiResponses.people.page1))
        .mockImplementationOnce(() => of(mockApiResponses.people.page2));

      const result = await client.getResource('people');
      expect(result).toEqual([{ name: 'Luke Skywalker' }, { name: 'Darth Vader' }]);
      expect(httpService.get).toHaveBeenCalledTimes(2);
    });

    it('should fetch filtered resources', async () => {
      jest
        .spyOn(client, 'getResourceById')
        .mockImplementationOnce(() => Promise.resolve(mockApiResponses.people.lukeSkywalker.data));
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(mockApiResponses.films.aNewHope))
        .mockImplementationOnce(() => of(mockApiResponses.films.theEmpireStrikesBack));

      const result = await client.getResource('films', undefined, { filterType: 'people', filterValue: '1' });
      expect(result).toEqual([{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }]);
      expect(client.getResourceById).toHaveBeenCalledWith('people', '1');
      expect(httpService.get).toHaveBeenCalledTimes(2);
    });

    it('should throw an error for invalid filter', async () => {
      jest.spyOn(client, 'getResourceById').mockResolvedValueOnce(null);

      await expect(client.getResource('films', undefined, { filterType: 'people', filterValue: '1' })).rejects.toThrow(
        'Invalid filter: people with id 1',
      );
    });
  });

  describe('getResourceById', () => {
    it('should fetch a resource by ID', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockApiResponses.people.lukeSkywalker));

      const result = await client.getResourceById('people', '1');
      expect(result).toEqual(mockApiResponses.people.lukeSkywalker.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
    });

    it('should throw NotFoundException if resource is not found', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
        throw { response: mockApiResponses.notFound };
      });

      await expect(client.getResourceById('people', '1')).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException for other errors', async () => {
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
        throw new Error('Some error');
      });

      await expect(client.getResourceById('people', '1')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('Caching', () => {
    it('should return cached response if available', async () => {
      const mockCachedResponse = { name: 'Luke Skywalker' };
      const mockRedisGet = jest.fn().mockResolvedValue(JSON.stringify(mockCachedResponse));

      const module = await createTestingModule({
        get: mockRedisGet,
        set: jest.fn(),
      });
      const client = module.get<SwapiClient>(SwapiClient);

      const result = await client.getResourceById('people', '1');
      expect(result).toEqual(mockCachedResponse);
      expect(mockRedisGet).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
      expect(httpService.get).not.toHaveBeenCalled();
    });

    it('should fetch from API and cache response if not cached', async () => {
      const mockRedisGet = jest.fn().mockResolvedValue(null);
      const mockRedisSet = jest.fn();

      const module = await createTestingModule({
        get: mockRedisGet,
        set: mockRedisSet,
      });
      const client = module.get<SwapiClient>(SwapiClient);
      const httpService = module.get<HttpService>(HttpService);

      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockApiResponses.people.lukeSkywalker));

      const result = await client.getResourceById('people', '1');

      expect(result).toEqual(mockApiResponses.people.lukeSkywalker.data);
      expect(mockRedisGet).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
      expect(mockRedisSet).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/1/',
        JSON.stringify(mockApiResponses.people.lukeSkywalker.data),
        'EX',
        process.env.CACHE_TTL_SECONDS,
      );
    });

    it('should not use cache if redis is not available', async () => {
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockApiResponses.people.lukeSkywalker));
      jest.spyOn(redisService, 'getOrNil').mockReturnValue(null);

      const result = await client.getResourceById('people', '1');
      expect(result).toEqual(mockApiResponses.people.lukeSkywalker.data);
      expect(httpService.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1/');
    });
  });

  describe('fetchFilteredResources', () => {
    it('should fetch multiple resources when relatedLinks is an array', async () => {
      jest.spyOn(client, 'getResourceById').mockResolvedValueOnce(mockApiResponses.people.lukeSkywalker.data);
      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() => of(mockApiResponses.films.aNewHope))
        .mockImplementationOnce(() => of(mockApiResponses.films.theEmpireStrikesBack));

      const result = await client['fetchFilteredResources']('films', 'people', '1');
      expect(result).toEqual([{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }]);
      expect(httpService.get).toHaveBeenCalledTimes(2);
    });

    it('should fetch a single resource when relatedLinks is a string', async () => {
      jest.spyOn(client, 'getResourceById').mockResolvedValueOnce(mockApiResponses.species.human.data);
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(mockApiResponses.planets.coruscant));

      const result = await client['fetchFilteredResources']('planets', 'species', '1');
      expect(result).toEqual([mockApiResponses.planets.coruscant.data]);
      expect(httpService.get).toHaveBeenCalledTimes(1);
    });
  });
});
