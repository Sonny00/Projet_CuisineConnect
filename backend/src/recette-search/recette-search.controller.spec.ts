import { Test, TestingModule } from '@nestjs/testing';
import { RecetteSearchController } from './recette-search.controller';

describe('RecetteSearchController', () => {
  let controller: RecetteSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecetteSearchController],
    }).compile();

    controller = module.get<RecetteSearchController>(RecetteSearchController);
  });

  it('ça doit être défini', () => {
    expect(controller).toBeDefined();
  });
});
