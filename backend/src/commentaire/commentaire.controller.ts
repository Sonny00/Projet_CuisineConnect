import {
  Controller,
  Post,
  ExecutionContext,
  Body,
  UseGuards,
  Param,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { CommentaireService } from './commentaire.service';
import { Commentaire } from '@prisma/client';
import { CreateCommentDto } from './commentaireDto/CreateComment.Dto';
import { findtheID } from '../users/user.decorator';

interface RequestWithUser extends Request {
  user: { sub: string };
}

@Controller('recettes/:recetteId/commentaires')
@UseGuards(AuthGuard('jwt'))
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) {}

  @Post()
  async createComment(
    @Param('recetteId') recetteId: string,
    @Body() createCommentDto: CreateCommentDto,
    @findtheID() userId: string,
  ) {
    const comment = await this.commentaireService.createComment(
      userId,
      recetteId,
      createCommentDto,
    );

    return comment;
  }
}
