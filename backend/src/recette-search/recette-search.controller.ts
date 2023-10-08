import { RecetteSearchService } from './recette-search.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { answerRecetteInputDTO } from './model/answer-recette-search.dto';

@Controller('recette-search')
export class RecetteSearchController {
  constructor(private readonly service: RecetteSearchService) {}
  @Post()
  getChatCompletionMessage(
    @Body(new ValidationPipe({ transform: true }))
    data: answerRecetteInputDTO,
  ) {
    return this.service.getAiModelAnswer(data);
  }
}
