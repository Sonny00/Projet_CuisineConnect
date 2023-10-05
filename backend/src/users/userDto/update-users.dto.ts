import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  @IsOptional()
  jobTitle: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
