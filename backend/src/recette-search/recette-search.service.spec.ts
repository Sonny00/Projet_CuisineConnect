import { Test, TestingModule } from '@nestjs/testing';
import { RecetteSearchService } from './recette-search.service';

describe('RecetteSearchService', () => {
  let service: RecetteSearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecetteSearchService],
    }).compile();

    service = module.get<RecetteSearchService>(RecetteSearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
