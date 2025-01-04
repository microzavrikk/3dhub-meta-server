import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTStrategyValidatePayload } from "../types/auth.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_TOKEN,
            ignoredExpiration: false
        });
    }

    async validate(payload: JWTStrategyValidatePayload) {
        // TODO: validate user
    }
}