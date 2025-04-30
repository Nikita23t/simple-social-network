import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(
        private configService: ConfigService,
        private userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_ACCESS_SECRET"),
        });
    }

    // async validate(payload: { id: string, role: string }) {
    //     const user = await this.userService.findById(parseInt(payload.id));
    //     if (!user) {
    //         throw new UnauthorizedException();
    //     }
    //     return user;
    // }
}