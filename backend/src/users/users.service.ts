import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {CreateUserDto, Role} from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Request } from "express";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateUserDto) {
        const hash = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                email: dto.email,
                first_name: dto.first_name,
                last_name: dto.last_name,
                nickname: dto.nickname,
                hash: hash,
                role: dto.role,
                bio: dto.bio,
                avatar_url: dto.avatar_url,
            }
        });
    }

    async getAllUsers() {
        return this.prisma.user.findMany();
    }

    async findById(id: string) {
        return this.prisma.user.findUnique({
            where: {
                id: +id,
            },
        });
    }

    async updateById(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: {
                ...dto,
                updated_at: new Date(),
            },
        });
    }

    async deleteById(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}