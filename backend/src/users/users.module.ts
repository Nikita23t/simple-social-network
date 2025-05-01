import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaService } from "../prisma/prisma.service"
import {ReactionsService} from "../reactions/reactions.service";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, ReactionsService],
    exports: [UsersService],
})
export class UsersModule {}