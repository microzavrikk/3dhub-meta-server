import { Injectable, Logger } from '@nestjs/common';
import { Profile, Prisma } from '../../utils/prisma/types';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
    private readonly logger = new Logger(ProfileService.name);

    constructor(private readonly profileRepository: ProfileRepository) {}

    async getProfile(userId: string): Promise<Profile | null> {
        try {
            return await this.profileRepository.getProfile(userId);
        } catch (error: any) {
            this.logger.error(`Error getting profile for user ${userId}: ${error.message}`);
            throw error;
        }
    }

    async setAvatarUrl(userId: string, avatarUrl: string): Promise<Profile> {
        try {
            return await this.profileRepository.setAvatarUrl(userId, avatarUrl);
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
                    socialLinks: profileData.socialLinks as any
                };
                return await this.profileRepository.createProfile(createData);
            }
        } catch (error: any) {
            this.logger.error(`Error updating profile for user ${userId}: ${error.message}`);
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
