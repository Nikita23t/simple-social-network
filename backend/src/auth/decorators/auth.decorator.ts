import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guards";
import { AdminGuard } from "../guards/admin.guards";
import { UserGuard } from "../guards/user.guards";


export type TypeRole = "ADMIN" | "USER" | undefined;

export function Auth(role: TypeRole = "USER") {
    return applyDecorators(
        role === "ADMIN"
            ? UseGuards(JwtAuthGuard, AdminGuard)
            : UseGuards(JwtAuthGuard),
        role === "USER"
            ? UseGuards(JwtAuthGuard, UserGuard)
            : UseGuards(JwtAuthGuard),
    );
}