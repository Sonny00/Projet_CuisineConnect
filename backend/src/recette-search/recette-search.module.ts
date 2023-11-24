import { Module } from '@nestjs/common';
import { RecetteSearchService } from './recette-search.service';
import { RecetteSearchController } from './recette-search.controller';

@Module({
  providers: [RecetteSearchService],
  controllers: [RecetteSearchController],
})
export class RecetteSearchModule {}
