import {Controller, Get, Param, ParseIntPipe, Patch, Req} from "@nestjs/common";
import { NotificationsService } from "./notification.service";
import { Request } from "express";

@Controller('/notifications')
export class NotificationsController {
    constructor(private notificationsService: NotificationsService) {}

    @Get()
    getAll(@Req() req: Request) {
        return this.notificationsService.getUserNotifications(req);
    }

    @Patch('/read/:id')
    markAsRead(@Param('id', ParseIntPipe) id: number) {
        return this.notificationsService.markAsRead(id);
    }
}

