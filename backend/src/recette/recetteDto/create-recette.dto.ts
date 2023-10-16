import { IsDefined, IsNotEmpty } from 'class-validator';

export class CreateRecetteDto {
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsNotEmpty()
  @IsDefined()
  description: string;
}
