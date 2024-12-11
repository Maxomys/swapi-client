import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsResolver } from './starships.resolver';
import { SwapiService } from 'src/swapi/swapi.service';
import { mockFilm, mockPerson, mockStarship } from 'test/mock-data';

describe('StarshipsResolver', () => {
  let resolver: StarshipsResolver;
  let swapiService: SwapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StarshipsResolver,
        {
          provide: SwapiService,
          useValue: {
            getStarshipById: jest.fn().mockResolvedValue(mockStarship),
            getStarships: jest.fn().mockResolvedValue([mockStarship]),
            getFilms: jest.fn().mockResolvedValue([mockFilm]),
            getPeople: jest.fn().mockResolvedValue([mockPerson]),
          },
        },
      ],
    }).compile();

    resolver = module.get<StarshipsResolver>(StarshipsResolver);
    swapiService = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('starship', () => {
    it('should return a single starship by ID', async () => {
      const result = await resolver.starship(1);
      expect(result).toEqual(mockStarship);
      expect(swapiService.getStarshipById).toHaveBeenCalledWith('1');
    });
  });

  describe('starships', () => {
    it('should return an array of starships', async () => {
      const result = await resolver.starships();
      expect(result).toEqual([mockStarship]);
      expect(swapiService.getStarships).toHaveBeenCalled();
    });
  });

  describe('films', () => {
    it('should return an array of films for a starship', async () => {
      const result = await resolver.films(mockStarship);
      expect(result).toEqual([mockFilm]);
      expect(swapiService.getFilms).toHaveBeenCalledWith(undefined, {
        filterType: 'starships',
        filterValue: mockStarship.getId(),
      });
    });
  });

  describe('pilots', () => {
    it('should return an array of pilots for a starship', async () => {
      const result = await resolver.pilots(mockStarship);
      expect(result).toEqual([mockPerson]);
      expect(swapiService.getPeople).toHaveBeenCalledWith(undefined, {
        filterType: 'starships',
        filterValue: mockStarship.getId(),
      });
    });
  });
});
