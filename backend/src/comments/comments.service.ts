import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, dto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        post_id: dto.postId,
        author_id: authorId,
      },
    });
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

    if (!comment) throw new NotFoundException('Комментарий не найден');
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
}
