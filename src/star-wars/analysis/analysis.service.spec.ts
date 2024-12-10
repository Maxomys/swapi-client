import { Test, TestingModule } from '@nestjs/testing';
import { AnalysisService } from './analysis.service';
import { UniqueWord } from './unique-word.model';
import { SwapiService } from 'src/swapi/swapi.service';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let swapiService: SwapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: SwapiService,
          useValue: {
            getPeople: jest.fn(),
            getFilms: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnalysisService>(AnalysisService);
    swapiService = module.get<SwapiService>(SwapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getMostMentionedCharacter', () => {
    it('should find the most mentioned character', async () => {
      const mockCrawls = 'luke skywalker darth vader luke skywalker leia yoda';
      const mockPeople = [
        { name: 'Luke Skywalker', url: '', created: '', edited: '' },
        { name: 'Darth Vader', url: '', created: '', edited: '' },
        { name: 'Leia Organa', url: '', created: '', edited: '' },
        { name: 'Yoda', url: '', created: '', edited: '' },
      ];

      jest.spyOn(swapiService, 'getPeople').mockResolvedValue(mockPeople as any);
      jest.spyOn(service as any, 'getJoinedCrawls').mockResolvedValue(mockCrawls);

      const result = await service.getMostMentionedCharacter();
      expect(result).toEqual(['Luke Skywalker']);
    });

    it('should return multiple characters if they have the same max mentions', async () => {
      const mockCrawls = 'luke skywalker darth vader darth vader luke skywalker leia yoda yoda';
      const mockPeople = [
        { name: 'Luke Skywalker', url: '', created: '', edited: '' },
        { name: 'Darth Vader', url: '', created: '', edited: '' },
        { name: 'Leia Organa', url: '', created: '', edited: '' },
        { name: 'Yoda', url: '', created: '', edited: '' },
      ];

      jest.spyOn(swapiService, 'getPeople').mockResolvedValue(mockPeople as any);
      jest.spyOn(service as any, 'getJoinedCrawls').mockResolvedValue(mockCrawls);

      const result = await service.getMostMentionedCharacter();

      expect(result).toEqual(expect.arrayContaining(['Luke Skywalker', 'Darth Vader', 'Yoda']));
    });
  });

  describe('getUniqueWords', () => {
    it('should get unique words and their counts', async () => {
      const mockCrawls = 'The quick brown fox jumps over the lazy dog.';
      jest.spyOn(service as any, 'getJoinedCrawls').mockResolvedValue(mockCrawls);

      const expected: UniqueWord[] = [
        { word: 'the', count: 2 },
        { word: 'quick', count: 1 },
        { word: 'brown', count: 1 },
        { word: 'fox', count: 1 },
        { word: 'jumps', count: 1 },
        { word: 'over', count: 1 },
        { word: 'lazy', count: 1 },
        { word: 'dog', count: 1 },
      ];

      const result = await service.getUniqueWords();
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it('should handle empty crawls', async () => {
      const mockCrawls = '';
      jest.spyOn(service as any, 'getJoinedCrawls').mockResolvedValue(mockCrawls);
      const result = await service.getUniqueWords();
      expect(result).toEqual([]);
    });
  });
});
