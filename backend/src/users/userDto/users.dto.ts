import { Role } from '@prisma/client';
import { ArrayNotEmpty, IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  firstname: string;

  @IsNotEmpty()
  @IsDefined()
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsDefined()
  password: string;
}
