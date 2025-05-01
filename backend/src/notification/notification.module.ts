import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {NotificationsService} from "./notification.service";

@Module({
  exports: [NotificationsService],
  providers: [NotificationsService, PrismaService],
})
export class NotificationsModule {}
