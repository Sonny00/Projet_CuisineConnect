import { Injectable, NotFoundException } from '@nestjs/common';
import { Commentaire, Recette, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './commentaireDto/CreateComment.Dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CommentaireService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    userId: string,
    recetteId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Commentaire> {
    const { text } = createCommentDto;
    if (!text) {
      throw new BadRequestException('Le champ "text" ne peut pas être vide');
    }

    const comment = await this.prisma.commentaire.create({
      data: {
        userId,
        recetteId,
        text,
      },
    });
    return comment;
  }

  async getCommentsForRecette(recetteId: string): Promise<Commentaire[]> {
    const comments = await this.prisma.commentaire.findMany({
      where: { recetteId },
    });
    return comments;
  }

  async getCommentById(commentId: string): Promise<Commentaire | null> {
    const comment = await this.prisma.commentaire.findUnique({
      where: { id: commentId },
    });
    return comment;
  }

  async updateComment(
    commentId: string,
    newText: string,
  ): Promise<Commentaire | null> {
    const comment = await this.prisma.commentaire.update({
      where: { id: commentId },
      data: { text: newText },
    });
    return comment;
  }

  async deleteComment(commentId: string): Promise<void> {
    await this.prisma.commentaire.delete({
      where: { id: commentId },
    });
  }
}
