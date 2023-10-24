import { Injectable, NotFoundException } from '@nestjs/common';
import { Commentaire, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentaireService {
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
      where: { recetteId },
      include: { user: true },
    });
  }
}
