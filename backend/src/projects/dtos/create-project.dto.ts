import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsArray()
  features: string[];

  @IsArray()
  tech: string[];

  @IsEnum(['web', 'mobile'])
  category: string;
}
