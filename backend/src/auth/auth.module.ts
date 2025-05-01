import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtStrategy} from "./strategy/jwt.strategy";
import { PrismaService } from 'src/prisma/prisma.service';

@Module({controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_PRIVATE_KEY"),
                signOptions: {
                    expiresIn: "1d",
                },
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
})
export class AuthModule {}
