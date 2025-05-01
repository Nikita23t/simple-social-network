import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export class CreateUserDto {
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

  @IsEnum(Role)
  role: Role;

  @Length(0, 255)
  @IsString()
  bio?: string;

  @IsString()
  avatar_url?: string;
}
