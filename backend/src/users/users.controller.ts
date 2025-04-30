import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("Пользователи")
@Controller("/users")
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: "Создание пользователя" })
    @Post()
    create() {
        return this.usersService.create();
    }

    @ApiOperation({ summary: "получение всех пользователей" })
    @Get()
    getAll() {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({ summary: "Поиск пользователя по id" })
    @Get(":id")
    findById() {
        return this.usersService.findById()
    }

    @ApiOperation({ summary: "Обновление данных у пользователя" })
    @Patch()
    update() {
        return this.usersService.update()
    }

    @ApiOperation({ summary: "Удаление пользователя" })
    @Delete()
    delete() {
        return this.usersService.delete()
    }
}