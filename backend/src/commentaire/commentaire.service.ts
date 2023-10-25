import { Injectable, NotFoundException } from '@nestjs/common';
import { Commentaire, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentaireService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCommentsForRecette(recetteId: string): Promise<Commentaire[]> {
    return this.prismaService.commentaire.findMany({
      where: { recetteId },
      include: { user: true },
    });
  }
}
