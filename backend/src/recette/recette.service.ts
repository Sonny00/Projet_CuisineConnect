import { Injectable, NotFoundException } from '@nestjs/common';
import { Recette } from '@prisma/client'; // Assurez-vous d'importer le modèle de données de Recette approprié depuis votre projet Prisma.
import { PrismaService } from 'src/prisma.service';
import { CreateRecetteDto } from './recetteDto/create-recette.dto';
import { UpdateRecetteDto } from './recetteDto/update-recette.dto';

@Injectable()
export class RecettesService {
  constructor(private prisma: PrismaService) { }

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
      throw new NotFoundException('Recette introuvable');
    }

    return recette;
  }

  async findAll(): Promise<Recette[]> {
    const recettes = await this.prisma.recette.findMany();

    return recettes;
  }
  async findOneByTitle(title: string): Promise<Recette | null> {
    const recette = await this.prisma.recette.findFirst({
      where: {
        title: {
          contains: title,
        },
      },
    });
    if (!recette) {
      throw new NotFoundException('Recette introuvable');
    }
    return recette;
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

  async findByIngredient(ingredient: string): Promise<Recette[]> {
    return this.prisma.recette.findMany({
      where: {
        OR: [
          {
            ingredients: {
              contains: ingredient,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: ingredient,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findByType(type: string): Promise<Recette[]> {
    return this.prisma.recette.findMany({
      where: {
        type: {
          equals: type,
          mode: 'insensitive',
        },
      },
    });
  }

  async findByIntent(intent: string): Promise<any> {
    return this.prisma.recette.findMany({
      where: {
        AND: [
          {
            type: 'dessert',
          },
          {
            ingredients: {
              contains: 'fruits',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
  async findByKeywords(keywords: string[]): Promise<Recette[]> {
    const orConditions = keywords.map((keyword) => ({
      ingredients: {
        contains: keyword,
      },
    }));

    return this.prisma.recette.findMany({
      where: {
        OR: orConditions,
      },
    });
  }

  async findByTitles(titles: string[]): Promise<Recette[]> {
    const recettes = await this.prisma.recette.findMany({
      where: {
        OR: titles.map((title) => ({
          title: {
            contains: title,
            mode: 'insensitive',
          },
        })),
      },
    });

    if (recettes.length === 0) {
      throw new NotFoundException('Aucune recette correspondante trouvée');
    }

    return recettes;
  }

  async findByTitle(titlesString: string): Promise<Recette[]> {
    const titles = titlesString.split(/,|\n/).map(title => title.trim());
    console.log('Titres recherchés:', titles);
    const recettes = await this.prisma.recette.findMany({
      where: {
        OR: titles.map(title => ({
          title: {
            contains: title,
            mode: 'insensitive',
          },
        })),
      },
    });

  const uniqueRecettes = new Map();
  recettes.forEach(recette => {
    if (!uniqueRecettes.has(recette.id)) {
      uniqueRecettes.set(recette.id, recette);
    }
  });

  return Array.from(uniqueRecettes.values());
}

}
