import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {NotificationsService} from "../notification/notification.service";
import {ReactionsService} from "../reactions/reactions.service";


@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, NotificationsService, ReactionsService],
})
export class PostsModule {}
