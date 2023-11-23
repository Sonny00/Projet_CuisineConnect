import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { RechercheBarService } from './recetteBar.service';

@Controller('recherche-bar')
export class RechercheBarController {
  constructor(private rechercheBarService: RechercheBarService) {}

  @Post('search')
  async search(@Body('prompt') prompt: string, @Res() res) {
    try {
      const results = await this.rechercheBarService.getRecettesFromPrompt(
        prompt,
      );
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }

  @Post('similar')
  async findSimilarRecipes(@Body('prompt') prompt: string, @Res() res) {
    try {
      const results =
        await this.rechercheBarService.getSimilarRecipesFromPrompt(prompt);
      res.status(HttpStatus.OK).json(results);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
}
