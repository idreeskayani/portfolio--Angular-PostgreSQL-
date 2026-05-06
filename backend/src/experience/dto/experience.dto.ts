import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateExperienceDto {
  @IsString() title!: string;
  @IsString() company!: string;
  @IsString() period!: string;
  @IsArray() highlights!: string[];
  @IsOptional() @IsNumber() sortOrder?: number;
}

export class UpdateExperienceDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() company?: string;
  @IsOptional() @IsString() period?: string;
  @IsOptional() @IsArray() highlights?: string[];
  @IsOptional() @IsNumber() sortOrder?: number;
}
