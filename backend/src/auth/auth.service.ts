import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(dto: LoginUserDto) {
    let user: User | null = null;

    if (dto.email) {
      user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    } else if (dto.nickname) {
      user = await this.prisma.user.findUnique({ where: { nickname: dto.nickname } });
    } else {
      throw new UnauthorizedException('Введите email или username');
    }

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return this.generateTokens(user);
  }

  async register(dto: RegisterUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { nickname: dto.nickname },
        ]
      },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email или username уже существует');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        nickname: dto.nickname,
        first_name: dto.first_name,
        last_name: dto.last_name,
        hash
      },
    });

    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload = { id: user.id, nickname: user.nickname };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user_id: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenEntity = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenEntity || new Date(tokenEntity.expiresAt) < new Date()) {
      throw new UnauthorizedException('Refresh токен невалиден или истек');
    }

    const accessToken = this.jwtService.sign(
      {
        id: tokenEntity.user.id,
        nickname: tokenEntity.user.nickname,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      },
    );

    return { accessToken };
  }
}
