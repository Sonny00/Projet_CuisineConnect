import { Module } from '@nestjs/common';
import { RecetteController } from './recette.controller';
import { RecettesService } from './recette.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecetteController],
  providers: [RecettesService, PrismaService], // Assurez-vous d'ajouter PrismaService ici s'il ne l'est pas déjà.
})
export class RecettesModule {}
