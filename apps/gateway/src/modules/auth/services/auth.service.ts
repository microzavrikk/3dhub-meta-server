import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SessionService } from "../../session/session.service";
import { AuthError } from "../auth.common";
import { JWTPayload, JWTStrategyValidatePayload, LoginPayload, RegisterPayload, TokenResponse } from "../types/auth.types";
import { ClientProxy } from "@nestjs/microservices";
import { Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { MailService } from "../../mail/mail.service";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private jwtService: JwtService,
        private sessionService: SessionService,
        private mailService: MailService,
        @Inject('USER_SERVICE') private readonly client: ClientProxy
    ) {}

    async register(data: RegisterPayload): Promise<TokenResponse> {
        this.logger.log(`Sending request to find user by username: ${data.username}`);
        let user = await this.client.send({ cmd: 'user-find-by-username' }, data.username).toPromise();
        this.logger.log(`Received response: ${JSON.stringify(user, null, 2)}`);

        if (user) {
            throw new HttpException(AuthError.USER_ALREADY_REGISTERED, HttpStatus.FOUND);
        }

        this.logger.log(`Checking if email is already registered: ${data.email}`);
        const existingUserWithEmail = await this.client.send({ cmd: 'user-find-by-email' }, data.email).toPromise();
        
        if (existingUserWithEmail) {
            throw new HttpException('Email already registered', HttpStatus.CONFLICT);
        }

        user = await this.client.send({ cmd: 'user-register' }, data).toPromise();

        this.logger.log(JSON.stringify(user, null, 2));

        if (!user) {
            throw new HttpException(AuthError.CANNOT_REGISTER, HttpStatus.BAD_REQUEST);
        }

        const sessionId = await this.sessionService.refreshSession(user.id);

        const payload: JWTPayload = { id: user.id, sessionId: sessionId };
        const accessToken = this.generateJWT({
            id: user.id,
            sessionId
        });

        this.logger.log(`Generated JWT: ${accessToken}`);

        this.mailService.sendUserConfirmation(user, accessToken);

        return { accessToken };
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

        this.logger.log(`Generated JWT: ${accessToken}`);

        return { accessToken } ;
    }

    invalidateSession(userId: string) {
        this.sessionService.delete(userId);
    }

    async verifyToken(token: string): Promise<JWTStrategyValidatePayload> {
        const payload = await this.jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET
        });
        this.logger.log(payload);  
        return payload;
    }

    private generateJWT(payload: JWTPayload): string {
        this.logger.log(payload);
        return this.jwtService.sign(payload, {privateKey: process.env.JWT_TOKEN,
             expiresIn: process.env.JWT_EXPIRES_IN});  
    }

    async deleteAccount(email: string): Promise<boolean> {
        this.logger.log(`Attempting to delete account with email: ${email}`);
        
        try {
            const result = await this.client.send({ cmd: 'user-delete-account' }, email).toPromise();
            
            if (result) {
                this.logger.log(`Successfully deleted account with email: ${email}`);
                const user = await this.client.send({ cmd: 'user-find-by-email' }, email).toPromise();
                if (user) {
                    await this.invalidateSession(user.id);
                }
            }
            
            return result;
        } catch (error) {
            this.logger.error(`Failed to delete account with email ${email}:`, error);
            throw new HttpException('Failed to delete account', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async confirmEmail(userId: string): Promise<boolean> {
        try {
            this.logger.log(`Confirming email for user ID: ${userId}`);
            const result = await this.client.send(
                { cmd: 'user-confirm-email' },
                userId
            ).toPromise();
            
            if (result) {
                this.logger.log(`Email confirmed successfully for user ID: ${userId}`);
            } else {
                this.logger.error(`Failed to confirm email for user ID: ${userId}`);
            }
            
            return result;
        } catch (error: any) {
            this.logger.error(`Error confirming email: ${error.message}`);
            throw new HttpException(
                'Failed to confirm email',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async findUserByUsername(username: string): Promise<any> {
        return await this.client.send({ cmd: 'user-find-by-username' }, username).toPromise();
    }
}