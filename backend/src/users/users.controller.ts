import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorator";

@ApiTags("Пользователи")
@Controller("/users")
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: "Создание пользователя" })
    @Post()
    @Auth("ADMIN")
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({ summary: "Получение всех пользователей" })
    @Get()
    @Auth()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Поиск пользователя по id" })
    @Get(":id")
    @Auth()
    findById(@Param("id") id: string) {
        return this.usersService.findById(+id);
    }

    @ApiOperation({ summary: "Обновление данных пользователя" })
    @Patch(":id")
    @Auth()
    update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(+id, dto);
    }

    @ApiOperation({ summary: "Удаление пользователя" })
    @Delete(":id")
    @Auth("ADMIN")
    delete(@Param("id") id: string) {
        return this.usersService.deleteById(+id);
    }
}
