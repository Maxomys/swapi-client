import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsResolver } from './planets.resolver';
import { SwapiService } from 'src/swapi/swapi.service';
import { mockFilm, mockPerson, mockPlanet } from 'test/mock-data';

describe('PlanetsResolver', () => {
  let resolver: PlanetsResolver;
  let swapiService: SwapiService;

  beforeEach(async () => {
    const mockSwapiService = {
      getPlanetById: jest.fn().mockResolvedValue(mockPlanet),
      getPlanets: jest.fn().mockResolvedValue([mockPlanet]),
      getFilms: jest.fn().mockResolvedValue([mockFilm]),
      getPeople: jest.fn().mockResolvedValue([mockPerson]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsResolver,
        {
          provide: SwapiService,
          useValue: mockSwapiService,
        },
      ],
    }).compile();

    resolver = module.get<PlanetsResolver>(PlanetsResolver);
    swapiService = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('planet', () => {
    it('should return a planet by ID', async () => {
      const result = await resolver.planet(1);
      expect(result).toEqual(mockPlanet);
      expect(swapiService.getPlanetById).toHaveBeenCalledWith('1');
    });
  });

  describe('planets', () => {
    it('should return an array of planets', async () => {
      const result = await resolver.planets();
      expect(result).toEqual([mockPlanet]);
      expect(swapiService.getPlanets).toHaveBeenCalled();
    });
  });

  describe('films', () => {
    it('should return films for a planet', async () => {
      const result = await resolver.films(mockPlanet);
      expect(result).toEqual([mockFilm]);
      expect(swapiService.getFilms).toHaveBeenCalledWith(undefined, {
        filterType: 'planets',
        filterValue: mockPlanet.getId(),
      });
    });
  });

  describe('residents', () => {
    it('should return residents for a planet', async () => {
      const result = await resolver.residents(mockPlanet);
      expect(result).toEqual([mockPerson]);
      expect(swapiService.getPeople).toHaveBeenCalledWith(undefined, {
        filterType: 'planets',
        filterValue: mockPlanet.getId(),
      });
    });
  });
});
