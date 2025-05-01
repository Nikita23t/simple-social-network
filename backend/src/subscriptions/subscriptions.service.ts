import {
    ConflictException,
    Injectable,
  } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';
  import { SubscribeDto } from './dto/subscribe.dto';
  
  @Injectable()
  export class SubscriptionsService {
    constructor(private prisma: PrismaService) {}
  
    async subscribe(userId: number, dto: SubscribeDto) {
      if (userId === dto.targetUserId) {
        throw new ConflictException('Нельзя подписаться на самого себя');
      }
  
      const existing = await this.prisma.subscription.findUnique({
        where: {
          follower_id_following_id: {
            follower_id: userId,
            following_id: dto.targetUserId,
          },
        },
      });
  
      if (existing) {
        throw new ConflictException('Вы уже подписаны на этого пользователя');
      }
  
      return this.prisma.subscription.create({
        data: {
          follower_id: userId,
          following_id: dto.targetUserId,
        },
      });
    }
  
    async unsubscribe(userId: number, targetUserId: number) {
      return this.prisma.subscription.delete({
        where: {
          follower_id_following_id: {
            follower_id: userId,
            following_id: targetUserId,
          },
        },
      });
    }
  
    async getFollowers(userId: number) {
      const followers = await this.prisma.subscription.findMany({
        where: { following_id: userId },
        include: { follower: true },
      });
  
      return {
        total: followers.length,
        followers: followers.map((s) => s.follower),
      };
    }
  
    async getFollowing(userId: number) {
      const following = await this.prisma.subscription.findMany({
        where: { follower_id: userId },
        include: { following: true },
      });
  
      return {
        total: following.length,
        following: following.map((s) => s.following),
      };
    }
  }
  