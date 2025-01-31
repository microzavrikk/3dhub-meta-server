import { MessagePattern } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { Profile, Prisma } from "../../utils/prisma/types";
import { ProfileService } from "./profile.service";

@Controller()
export class ProfileController {
    private readonly logger = new Logger(ProfileController.name);

    constructor(
        private readonly profileService: ProfileService
    ) {}

    @MessagePattern({ cmd: 'profile-get' })
    async getProfile(userId: string): Promise<Profile | null> {
        this.logger.log(`Received request to get profile for user ID: ${userId}`);
        return this.profileService.getProfile(userId);
    }

    @MessagePattern({ cmd: 'profile-set-avatar' })
    async setAvatarUrl(data: { userId: string, avatarUrl: string }): Promise<Profile> {
        this.logger.log(`Received request to set avatar URL for user ID: ${data.userId}`);
        return this.profileService.updateProfile(data.userId, { avatarUrl: data.avatarUrl });
    }

    @MessagePattern({ cmd: 'profile-update' })
    async updateProfile(data: { userId: string, profile: Omit<Prisma.ProfileUpdateInput, 'user'> }): Promise<Profile> {
        this.logger.log(`Received request to update profile for user ID: ${data.userId}`);
        return this.profileService.updateProfile(data.userId, data.profile);
    }

    @MessagePattern({ cmd: 'profile-delete' })
    async deleteProfile(userId: string): Promise<boolean> {
        this.logger.log(`Received request to delete profile for user ID: ${userId}`);
        return this.profileService.deleteProfile(userId);
    }
}
