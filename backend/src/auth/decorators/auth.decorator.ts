import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guards";
import { AdminGuard } from "../guards/admin.guards";
import { UserGuard } from "../guards/user.guards";


export type TypeRole = "ADMIN" | "USER" | undefined;

export function Auth(role?: TypeRole) {
    if (role === "ADMIN") {
        return applyDecorators(UseGuards(JwtAuthGuard, AdminGuard));
    }

    if (role === "USER") {
        return applyDecorators(UseGuards(JwtAuthGuard, UserGuard));
    }

    return applyDecorators(UseGuards(JwtAuthGuard));
}
