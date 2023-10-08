import { IsNotEmpty, IsString } from 'class-validator';

export class answerRecetteInputDTO {
  @IsNotEmpty()
  @IsString()
  message: string;
}

export class answerRecetteOutputDTO {
  @IsNotEmpty()
  @IsString()
  aiMessage: string;

  static getInstance(aiMessage: string) {
    const result = new answerRecetteOutputDTO();
    result.aiMessage = aiMessage;
    return result;
  }
}
