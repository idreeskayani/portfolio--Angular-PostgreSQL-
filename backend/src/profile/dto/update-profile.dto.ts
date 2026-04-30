import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() github?: string;
  @IsOptional() @IsString() linkedin?: string;
  @IsOptional() @IsString() profilePic?: string;
  @IsOptional() @IsString() resumeUrl?: string;
  @IsOptional() @IsArray() aboutParagraphs?: string[];
  @IsOptional() @IsArray() interests?: string[];
  @IsOptional() @IsArray() strengths?: string[];
  @IsOptional() @IsString() goalText?: string;
  @IsOptional() @IsArray() techTags?: string[];
  @IsOptional() @IsString() degree?: string;
  @IsOptional() @IsString() institution?: string;
  @IsOptional() @IsString() educationPeriod?: string;
}
