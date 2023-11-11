import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Delete
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavoriteService } from './favoris.service';
import { findtheID } from '../users/user.decorator';

@Controller()
export class FavoriteController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Post('recettes/:recetteId/favoris')
  @UseGuards(AuthGuard('jwt'))
  async addToFavorites(
    @findtheID() userId: string,
    @Param('recetteId') recetteId: string,
  ) {
    return await this.favoritesService.addToFavorites(userId, recetteId);
  }

  @Get('users/:userId/favoris')
  async getFavorites(@Param('userId') userId: string) {
    return await this.favoritesService.getFavorites(userId);
  }

  @Delete('recettes/:recetteId/favoris')
  async removeFromFavorites(
    @findtheID() userId: string,
    @Param('recetteId') recetteId: string,
  ) {
    return await this.favoritesService.removeFromFavorites(userId, recetteId);
  }
}
