import { IsNumber, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateNoteDto {
  @IsNumber({}, { message: 'La note doit être un nombre' })
  @IsNotEmpty({ message: 'La note ne peut pas être vide' })
  @Min(1, { message: 'La note doit être au moins 1' })
  @Max(5, { message: 'La note ne peut pas dépasser 5' })
  rating: number;
}
