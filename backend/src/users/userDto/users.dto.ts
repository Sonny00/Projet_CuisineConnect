import { Role } from '@prisma/client';
import { ArrayNotEmpty, IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  firstname: string;

  @IsNotEmpty()
  @IsDefined()
  lastname: string;

  @IsNotEmpty()
  @IsDefined()
  jobTitle: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;

  @ArrayNotEmpty()
  skills: string[]
}
