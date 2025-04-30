import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create() {
        return this.prisma.user.create({})
    }

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async findById() {
        return
    }

    async update() {
        return
    }

    async delete() {
        return
    }
}