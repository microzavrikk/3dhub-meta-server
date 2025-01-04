import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SessionService } from "../../session/session.service";
import { AuthError } from "../auth.common";
import { JWTPayload, JWTStrategyValidatePayload, LoginPayload, RegisterPayload, TokenResponse } from "../types/auth.types";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService,
        private sessionService: SessionService,
        @Inject('USER_SERVICE') private readonly client: ClientProxy
    ) {}

    async register(data: RegisterPayload): Promise<boolean> {
        this.logger.log(`Sending request to find user by username: ${data.username}`);
        let user = await this.client.send({ cmd: 'user-find-by-username' }, data.username).toPromise();
        this.logger.log(`Received response: ${JSON.stringify(user, null, 2)}`);

        if (user) {
            throw new HttpException(AuthError.USER_ALREADY_REGISTERED, HttpStatus.FOUND);
        }

        user = await this.client.send({ cmd: 'user-register' }, data).toPromise();

        if (!user) {
            throw new HttpException(AuthError.CANNOT_REGISTER, HttpStatus.BAD_REQUEST);
        }

        return true;
    }

    async login(data: LoginPayload): Promise<TokenResponse> {

        const user = await this.client.send({ cmd: 'user-login' }, data).toPromise();

        if(!user) {
            throw new NotFoundException();
        }

        const sessionId = await this.sessionService.refreshSession(user.id);

        const payload: JWTPayload = { id: user.id, sessionId: sessionId };
        const accessToken = this.generateJWT({
            id: user.id,
            sessionId
        });

        return { accessToken } ;
    }

    invalidateSession(userId: string) {
        this.sessionService.delete(userId);
    }

    async verifyToken(token: string): Promise<JWTStrategyValidatePayload> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        });
        return payload;
    }

    private generateJWT(payload: JWTPayload): string {
        return this.jwtService.sign(payload, {});
    }
}