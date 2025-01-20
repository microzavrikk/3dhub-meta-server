import { Controller, Get, Query, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Get('confirm')
    async confirmEmail(@Query('token') token: string) {
        try {
            if (!token) {
                throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
            }

            const payload: any = await this.authService.verifyToken(token);
            this.logger.log(payload);
            
            if (!payload) {
                throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
            }
            const result = await this.authService.confirmEmail(payload.id);
            if (result) {
                return { message: 'Email confirmed successfully' };
            } else {
                throw new HttpException('Failed to confirm email', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (error: any) {
            this.logger.error(`Email confirmation failed: ${error.message}`);
            throw new HttpException(
                error.message || 'Email confirmation failed',
                error.status || HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
