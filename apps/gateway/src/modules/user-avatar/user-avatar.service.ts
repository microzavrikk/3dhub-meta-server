import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserAvatarService {
    private readonly logger = new Logger(UserAvatarService.name);

    constructor(
        @Inject('USERS_SERVICE') private readonly usersClient: ClientProxy,
    ) {}

    async uploadAvatar(data: any) {
        try {
            const result = await this.usersClient.send(
                { cmd: 'users.upload-avatar' },
                data
            ).toPromise();
            return result;
        } catch (error: any) {
            this.logger.error(`Error uploading avatar: ${error.message}`);
            throw new HttpException(
                'Failed to upload avatar',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getAvatar(username: string) {
        try {
            const result = await this.usersClient.send({ cmd: 'users.get-avatar' }, username).toPromise();
            return result;
        } catch (error: any) {
            this.logger.error(`Error getting avatar: ${error.message}`);
            throw new HttpException('Failed to get avatar', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
