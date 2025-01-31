import { Injectable, Logger } from '@nestjs/common';
import { Profile, Prisma } from '../../utils/prisma/types';
import { ProfileRepository } from './profile.repository';
import { UserService } from '../user/user.service';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class ProfileService {
    private readonly logger = new Logger(ProfileService.name);

    constructor(private readonly profileRepository: ProfileRepository, private readonly userService: UserService) {}

    async createProfile(userId: string): Promise<Profile> {
        const profile = await this.profileRepository.createProfile({
            user: { connect: { id: userId } },
            avatarUrl: "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg",
            bio: null,
            socialLinks: Prisma.JsonNull,
            backgroundUrl: "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2526512481.jpg" 
        });
        this.logger.log(`Profile created for user ${userId}, ${JSON.stringify(profile, null, 2)}`);
        return profile;
    }

    async getProfile(userId: string): Promise<Profile | null> {
        try {
            return await this.profileRepository.getProfile(userId);
        } catch (error: any) {
            this.logger.error(`Error getting profile for user ${userId}: ${error.message}`);
            throw error;
        }
    }

    async setAvatarUrl(userId: string, avatarUrl: string): Promise<Profile> {
        this.logger.log(`Setting avatar URL for user ${userId} to ${avatarUrl}`);
        const user = await this.userService.findUserByUsername(userId);
        if (!user) {
            this.logger.error(`User not found for ID: ${userId}`);
            throw new RpcException('User not found');
        }
        else {
            this.logger.log(`User found for ID: ${userId}`);
        }
        this.logger.log(`Setting avatar URL for user ${JSON.stringify(user, null, 2)} to ${avatarUrl}`);
        try {
            return await this.profileRepository.setAvatarUrl(user.id, avatarUrl);
        } catch (error: any) {
            this.logger.error(`Error setting avatar URL for user ${userId}: ${error.message}`);
            throw error;
        }
    }

    async updateProfile(userId: string, profileData: Omit<Prisma.ProfileUpdateInput, 'user'>): Promise<Profile> {
        try {
            const existingProfile = await this.profileRepository.getProfile(userId);
            if (existingProfile) {
                return await this.profileRepository.updateProfile(userId, profileData);
            } else {
                const createData: Prisma.ProfileCreateInput = {
                    user: { connect: { id: userId } },
                    avatarUrl: profileData.avatarUrl as string | null,
                    bio: profileData.bio as string | null,
                    socialLinks: profileData.socialLinks as any,
                    backgroundUrl: profileData.backgroundUrl as string | null 
                };
                return await this.profileRepository.createProfile(createData);
            }
            
        } catch (error: any) {
            this.logger.error(`Error updating profile for user ${userId}: ${error.message}`);
            throw error;
        }
    }

    async setBackgroundUrl(userId: string, backgroundUrl: string): Promise<Profile> {
        this.logger.log(`Setting background URL for user ${userId} to ${backgroundUrl}`);
        const user = await this.userService.findUserByUsername(userId);
        if (!user) {
            this.logger.error(`User not found for ID: ${userId}`);
            throw new RpcException('User not found');
        }
        else {
            this.logger.log(`User found for ID: ${userId}`);
        }
        try {
            return await this.profileRepository.setBackgroundUrl(user.id, backgroundUrl);
        } catch (error: any) {
            this.logger.error(`Error setting background URL for user ${userId}: ${error.message}`);
            throw error;
        }
    }

    async deleteProfile(userId: string): Promise<boolean> {
        try {
            await this.profileRepository.deleteProfile(userId);
            return true;
        } catch (error: any) {
            this.logger.error(`Error deleting profile for user ${userId}: ${error.message}`);
            return false;
        }
    }
}
