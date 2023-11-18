import { IsArray, IsString } from 'class-validator';

export class PreferenceDto {
  @IsArray()
  @IsString({ each: true })
  allergies: string[];

  @IsArray()
  @IsString({ each: true })
  contreIndications: string[];
}
