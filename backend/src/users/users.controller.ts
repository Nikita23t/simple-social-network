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
    @Post("/create")
    // @Auth("ADMIN")
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({ summary: "Получение всех пользователей" })
    @Get("/all")
    // @Auth()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: "Поиск пользователя по id" })
    @Get("/find/:id")
    // @Auth()
    findById(@Param("id") id: string) {
        return this.usersService.findById(id);
    }

    @ApiOperation({ summary: "Обновление данных пользователя" })
    @Patch("/update/:id")
    // @Auth()
    update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.updateById(+id, dto);
    }

    @ApiOperation({ summary: "Удаление пользователя" })
    @Delete("/delete/:id")
    // @Auth("ADMIN")
    delete(@Param("id") id: string) {
        return this.usersService.deleteById(+id);
    }
}
