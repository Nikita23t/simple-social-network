import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { NotificationsService } from "../notification/notification.service";
import {Request} from "express";

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(req: Request, dto: CreatePostDto) {
    if (!req.user) throw new NotFoundException("Данные не пришли");
    const userId = req.user["id"];
    const post = await this.prisma.post.create({
      data: {
        ...dto,
        author_id: userId,
      },
    });

    const followers = await this.prisma.subscription.findMany({
      where: {
        following_id: userId,
      },
      select: {
        follower_id: true,
      },
    });

    const notifications = followers.map((follower) =>
      this.notificationsService.createNotification({
        type: "post",
        message: `Пользователь создал новый пост`,
        recipientId: follower.follower_id,
        senderId: userId,
      }),
    );

    await Promise.all(notifications);

    return post;
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { author: true, comments: true },
    });
  }

  async findById(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true, comments: true },
    });
    if (!post) throw new NotFoundException("Пост не найден");
    return post;
  }

  async update(req: Request, dto: UpdatePostDto) {
    if (!req.user) throw new NotFoundException("Данные не пришли");
    const userId = req.user["id"];
    return this.prisma.post.update({
      where: { id: userId },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
