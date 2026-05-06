import { IsString, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class CreateBlogDto {
  @IsString() title!: string;
  @IsString() slug!: string;
  @IsString() excerpt!: string;
  @IsString() content!: string;
  @IsOptional() @IsString() thumbnail?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateBlogDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() thumbnail?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsBoolean() published?: boolean;
}
