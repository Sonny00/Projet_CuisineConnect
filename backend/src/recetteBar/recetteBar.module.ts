import { Module } from '@nestjs/common';
import { RechercheBarController } from './recetteBar.controller';
import { RechercheBarService } from './recetteBar.service';
import { PrismaService } from 'src/prisma.service';
import { RecettesService } from 'src/recette/recette.service';

@Module({
  controllers: [RechercheBarController],
  providers: [RechercheBarService, PrismaService, RecettesService],
})
export class RecetteBarModule {}
