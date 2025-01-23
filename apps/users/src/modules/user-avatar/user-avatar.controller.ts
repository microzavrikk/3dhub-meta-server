import { Controller } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserAvatarService } from "./user-avatar.service"

@Controller()
export class UserAvatarController {
    private readonly logger = new Logger(UserAvatarController.name);

    constructor(private readonly userAvatarService: UserAvatarService) {}

    @MessagePattern({ cmd: 'users.upload-avatar' })
    async uploadAvatar(data: any) {
        return this.userAvatarService.uploadAvatar(data);
    }

    @MessagePattern({ cmd: 'users.get-avatar' })
    async getAvatar(username: string) {
        return this.userAvatarService.getAvatar(username);
    }
}