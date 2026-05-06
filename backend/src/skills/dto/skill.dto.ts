import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateSkillDto {
  @IsString() category!: string;
  @IsString() icon!: string;
  @IsArray() skills!: string[];
  @IsOptional() @IsNumber() sortOrder?: number;
}

export class UpdateSkillDto {
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsArray() skills?: string[];
  @IsOptional() @IsNumber() sortOrder?: number;
}
