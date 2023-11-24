import { Injectable, NotFoundException } from '@nestjs/common';
import { Commentaire, Recette, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async addToFavorites(userId: string, recetteId: string): Promise<User> {
    const recette = await this.prisma.recette.findUnique({
      where: { id: recetteId },
    });
    if (!recette) {
      throw new NotFoundException('Recette non trouvée');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (user.favorites.some((favorite) => favorite.id === recette.id)) {
      throw new BadRequestException(
        "La recette est déjà dans les favoris de l'utilisateur",
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { favorites: { connect: { id: recette.id } } },
      include: { favorites: true },
    });

    return updatedUser;
  }

  async removeFromFavorites(userId: string, recetteId: string): Promise<User> {
    const recette = await this.prisma.recette.findUnique({
      where: { id: recetteId },
    });
    if (!recette) {
      throw new NotFoundException('Recette non trouvée');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!user.favorites.some((favorite) => favorite.id === recette.id)) {
      throw new BadRequestException(
        "La recette n'est pas dans les favoris de l'utilisateur",
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { favorites: { disconnect: { id: recette.id } } },
      include: { favorites: true },
    });

    return updatedUser;
  }

  async getFavorites(userId: string): Promise<Recette[]> {
    const userWithFavorites = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { favorites: true },
    });

    if (!userWithFavorites) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return userWithFavorites.favorites;
  }
}
