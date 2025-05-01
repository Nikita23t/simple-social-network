import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import {NotificationsService} from "../notification/notification.service";
import {ReactionsService} from "../reactions/reactions.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, NotificationsService, ReactionsService],
})
export class CommentsModule {}
