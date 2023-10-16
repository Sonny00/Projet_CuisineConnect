import { IsDefined, IsNotEmpty } from 'class-validator';

export class UpdateRecetteDto {
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsNotEmpty()
  @IsDefined()
  description: string;
}
