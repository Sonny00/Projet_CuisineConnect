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
import { Commentaire } from '@prisma/client';
import { findtheID } from '../users/user.decorator';
import { FavoriteService } from './favoris.service';
import { NotFoundException } from '@nestjs/common';

@Controller('recettes/:recetteId/favoris')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Post()
  async addToFavorites(
    @findtheID() userId: string,
    @Param('recetteId') recetteId: string,
  ) {
    const updatedUser = await this.favoritesService.addToFavorites(
      userId,
      recetteId,
    );
    return updatedUser;
  }

  @Post('recettes/:recetteId/favoris/remove')
  async removeFromFavorites(
    @findtheID() userId: string,
    @Param('recetteId') recetteId: string,
  ) {
    const updatedUser = await this.favoritesService.removeFromFavorites(
      userId,
      recetteId,
    );
    return updatedUser;
  }
}
