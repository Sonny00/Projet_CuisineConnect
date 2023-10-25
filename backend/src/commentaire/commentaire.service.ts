import { Injectable, NotFoundException } from '@nestjs/common';
import { Commentaire, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentaireService {
<<<<<<< HEAD
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentsForRecette(recetteId: string): Promise<Commentaire[]> {
    return this.prismaService.commentaire.findMany({
=======
  constructor(private prisma: PrismaService) {}

  async createComment(
    recetteId: string,
    userId: string,
    text: string,
  ): Promise<Commentaire> {
    return this.prisma.commentaire.create({
      data: {
        recetteId,
        userId,
        text,
      },
    });
  }

  async getCommentsForRecette(recetteId: string): Promise<Commentaire[]> {
    return this.prisma.commentaire.findMany({
>>>>>>> 379c60fe48a90b97d2de49f44147da1fbd64ee13
      where: { recetteId },
      include: { user: true },
    });
  }
}
