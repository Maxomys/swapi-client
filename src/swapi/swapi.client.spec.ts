import { Test, TestingModule } from '@nestjs/testing';
import { SwapiClient } from './swapi.client';

describe('SwapiService', () => {
  let service: SwapiClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwapiClient],
    }).compile();

    service = module.get<SwapiClient>(SwapiClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
