import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {Request} from "express";

@Injectable()
export class NotificationsService {
    constructor(private prisma: PrismaService) {}

    async createNotification(data: {
        type: string;
        message: string;
        recipientId: number;
        senderId?: number;
    }) {
        return this.prisma.notification.create({
            data: {
                ...data,
            },
        });
    }

    async getUserNotifications(req: Request) {
        if (!req.user) throw new NotFoundException("Данные не пришли");
        const userId = req.user["id"];
        return this.prisma.notification.findMany({
            where: { recipientId: userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async markAsRead(id: number) {
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
}
