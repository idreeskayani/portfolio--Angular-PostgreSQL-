import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString() name!: string;
  @IsString() type!: string;
  @IsString() description!: string;
  @IsArray() features!: string[];
  @IsArray() tech!: string[];
  @IsString() category!: string;
  @IsOptional() @IsNumber() sortOrder?: number;
}

export class UpdateProjectDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() tech?: string[];
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsNumber() sortOrder?: number;
}
