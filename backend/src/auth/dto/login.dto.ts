import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @Length(6, 64)
  @IsString()
  @IsOptional()
  nickname?: string;

  @Length(6, 64)
  @IsString()
  password: string;
}