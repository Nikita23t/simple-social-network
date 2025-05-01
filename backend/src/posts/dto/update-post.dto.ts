import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Length(1, 1000)
  content?: string;

  @IsOptional()
  @IsString()
  image_url?: string;
}
