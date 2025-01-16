import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTStrategyValidatePayload } from "../types/auth.types";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_TOKEN,
            ignoreExpiration: false
        });
    }

    async validate(payload: JWTStrategyValidatePayload) {
        if (!payload) {
            throw new UnauthorizedException('Invalid token payload');
        }

        const { id, sessionId, iat, exp } = payload;

        if (!id || !sessionId) {
            throw new UnauthorizedException('Token payload missing required fields');
        }

        return {
            id,
            sessionId
        };
    }
}