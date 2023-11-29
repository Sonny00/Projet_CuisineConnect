import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { RecetteSearchService } from './recette-search.service';
import { answerRecetteInputDTO } from './model/answer-recette-search.dto';

@Controller('recette-search')
export class RecetteSearchController {
  constructor(private readonly service: RecetteSearchService) {}

  @Post()
  async getChatCompletionMessage(
    @Body(new ValidationPipe({ transform: true })) data: answerRecetteInputDTO,
  ) {
    const response = await this.service.getRecetteSearchAnswer(data);
    return response;
  }
}
