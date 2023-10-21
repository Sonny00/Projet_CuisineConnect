import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateRecetteDto {
  title: string;

  @IsNotEmpty()
  @IsDefined()
  description: string;

  instructions?: string;
  ingredients?: string;
}
