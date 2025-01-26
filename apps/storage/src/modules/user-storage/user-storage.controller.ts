import { Controller } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserStorageService } from "./user-storage.service";

@Controller()
export class UserStorageController {
    private readonly logger = new Logger(UserStorageController.name);

    constructor(
        private readonly userStorageService: UserStorageService
    ) {}

    @MessagePattern({ cmd: 'storage.upload-avatar' })
    async uploadAvatar(data: { username: string, file: Express.Multer.File }) {
        try {
            this.logger.log(`Processing avatar upload for user: ${data.username}`);
            const result = await this.userStorageService.uploadAvatar(data.username, data.file);
            this.logger.log(`Avatar upload completed for user: ${data.username}`);
            return result;
        } catch (error: any) {
            this.logger.error(`Failed to upload avatar: ${error.message}`);
            throw error;
        }
    }

    @MessagePattern({ cmd: 'storage.get-banner' })
    async getAvatar(username: string) {
        return this.userStorageService.getAvatar(username);
    }   

    @MessagePattern({ cmd: 'storage.upload-banner' })
    async uploadBanner(data: { username: string, file: Express.Multer.File }) {
        return this.userStorageService.uploadBanner(data.username, data.file);
    }

    @MessagePattern({ cmd: 'storage.get-banner' })
    async getBanner(username: string) {
        return this.userStorageService.getBanner(username);
    }
}