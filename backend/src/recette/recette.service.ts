import { Injectable, NotFoundException } from '@nestjs/common';
import { Recette } from '@prisma/client'; // Assurez-vous d'importer le modèle de données de Recette approprié depuis votre projet Prisma.
import { PrismaService } from 'src/prisma.service';
import { CreateRecetteDto } from './recetteDto/create-recette.dto';
import { UpdateRecetteDto } from './recetteDto/update-recette.dto';

@Injectable()
export class RecettesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRecetteDto): Promise<Recette> {
    const recetteData = this.prisma.recette.create({
      data: data,
    });

    return recetteData;
  }

  async findOne(id: string): Promise<Recette | null> {
    const recette = await this.prisma.recette.findUnique({
      where: { id },
    });

    if (!recette) {
      throw new NotFoundException('Recette not found');
    }

    return recette;
  }

  async findAll(): Promise<Recette[]> {
    const recettes = await this.prisma.recette.findMany();

    return recettes;
  }

  async update(
    id: string,
    updateRecetteDto: UpdateRecetteDto,
  ): Promise<Recette | null> {
    const updatedRecette = await this.prisma.recette.update({
      where: { id },
      data: updateRecetteDto,
    });

    return updatedRecette;
  }

  async remove(id: string): Promise<string> {
    await this.prisma.recette.delete({
      where: { id },
    });

    return 'deleted';
  }
}
