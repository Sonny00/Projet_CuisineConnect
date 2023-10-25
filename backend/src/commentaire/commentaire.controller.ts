import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { Controller, Post, Body, ValidationPipe, Request } from '@nestjs/common'; // Import Request
import { CommentaireService } from './commentaire.service';
import { Commentaire } from '@prisma/client';
import { Param } from '@nestjs/common';

@Controller('recettes/:recetteId/commentaires')
@UseGuards(AuthGuard('jwt'))
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  @Post()
  async createComment(
    @Param('recetteId') recetteId: string,
    @Body('text') text: string,
    @Request() req: any,
  ): Promise<Commentaire> {
    const userId = req.user.sub;

    return this.commentaireService.createComment(recetteId, userId, text);
  }

  // Other controller methods
}

