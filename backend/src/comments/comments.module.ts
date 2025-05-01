import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import {NotificationsService} from "../notification/notification.service";

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, PrismaService, NotificationsService],
})
export class CommentsModule {}
