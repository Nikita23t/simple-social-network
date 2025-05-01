import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...dto,
        author_id: authorId,
      },
    });
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
    if (!post) throw new NotFoundException('Пост не найден');
    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
