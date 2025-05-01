import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @Length(6, 64)
  @IsString()
  nickname: string;

  @Length(1, 64)
  @IsString()
  first_name: string;

  @Length(1, 64)
  @IsString()
  last_name: string;

  @Length(6, 64)
  @IsString()
  password: string;
}
