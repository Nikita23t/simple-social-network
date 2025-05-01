import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {ReactionType} from "@prisma/client";

@Injectable()
export class ReactionsService {
    constructor(private prisma: PrismaService) {}

    async reactToPost(userId: number, postId: number, type: ReactionType) {
        return this.react(userId, { post_id: postId }, type, 'post');
    }

    async reactToComment(userId: number, commentId: number, type: ReactionType) {
        return this.react(userId, { comment_id: commentId }, type, 'comment');
    }

    private async react(
        userId: number,
        target: { post_id?: number; comment_id?: number },
        type: ReactionType,
        targetType: 'post' | 'comment'
    ) {
        const existing = await this.prisma.reaction.findUnique({
            where: {
                user_id_post_id_comment_id: {
                    user_id: userId,
                    post_id: target.post_id ?? null,
                    comment_id: target.comment_id ?? null,
                },
            },
        });

        if (existing && existing.type === type) {
            await this.prisma.reaction.delete({
                where: { id: existing.id },
            });

            await this.updateCounters(targetType, target, type, -1);
            return { message: `${type} removed` };
        }

        // Переключение реакции
        if (existing) {
            await this.prisma.reaction.update({
                where: { id: existing.id },
                data: { type },
            });

            await this.updateCounters(targetType, target, existing.type, -1);
            await this.updateCounters(targetType, target, type, 1);
            return { message: `Reaction switched to ${type}` };
        }

        await this.prisma.reaction.create({
            data: {
                ...target,
                user_id: userId,
                type,
            },
        });

        await this.updateCounters(targetType, target, type, 1);
        return { message: `${type} added` };
    }

    private async updateCounters(
        targetType: 'post' | 'comment',
        target: { post_id?: number; comment_id?: number },
        type: ReactionType,
        delta: number
    ) {
        const id = target.post_id ?? target.comment_id;
        const fieldToUpdate = type === 'LIKE' ? 'likes' : 'dislikes';

        if (targetType === 'post') {
            await this.prisma.post.update({
                where: { id },
                data: {
                    [fieldToUpdate]: {
                        increment: delta,
                    },
                },
            });
        } else if (targetType === 'comment') {
            await this.prisma.comment.update({
                where: { id },
                data: {
                    [fieldToUpdate]: {
                        increment: delta,
                    },
                },
            });
        }
    }

}
