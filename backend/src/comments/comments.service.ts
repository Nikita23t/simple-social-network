import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { NotificationsService } from "../notification/notification.service";

@Injectable()
export class CommentsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async create(authorId: number, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: dto.postId },
      select: { author_id: true },
    });

    if (!post) throw new NotFoundException("Пост не найден");

    const comment = await this.prisma.comment.create({
      data: {
        content: dto.content,
        post_id: dto.postId,
        author_id: authorId,
      },
    });

    if (post.author_id !== authorId) {
      await this.notificationsService.createNotification({
        type: "comment",
        message: `Ваш пост прокомментировали`,
        recipientId: post.author_id,
        senderId: authorId,
      });
    }

    return comment;
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
      },
    });
  }

  async findById(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { author: true, post: true },
    });

    if (!comment) throw new NotFoundException("Комментарий не найден");
    return comment;
  }

  async update(id: number, dto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }

  async like(id: number) {
    return this.prisma.comment.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
  }

  async dislike(id: number) {
    return this.prisma.comment.update({
      where: { id },
      data: { dislikes: { increment: 1 } },
    });
  }
}
