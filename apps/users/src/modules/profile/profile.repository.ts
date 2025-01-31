import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../utils/prisma/prisma.service";
import { Profile, Prisma } from "../../utils/prisma/types";
import { Logger } from "@nestjs/common";

@Injectable()
export class ProfileRepository {
    private readonly logger = new Logger(ProfileRepository.name);

    constructor(private readonly prisma: PrismaService) {}

    async getProfile(userId: string): Promise<Profile | null> {
        const where: Prisma.ProfileWhereUniqueInput = { userId };
        const profile = await this.prisma.profile.findUnique({ where });
        if (!profile) {
            this.logger.error(`Profile not found for user ${userId}`);
            return null;
        }
        else {
            this.logger.log(`Profile found for user ${userId}`);
        }
        return profile;
    }

    async setBackgroundUrl(userId: string, backgroundUrl: string): Promise<Profile> {
        const where: Prisma.ProfileWhereUniqueInput = { userId };
        return await this.prisma.profile.update({ where, data: { backgroundUrl } });
    }

    async setAvatarUrl(userId: string, avatarUrl: string): Promise<Profile> {
        const where: Prisma.ProfileWhereUniqueInput = { userId };
        this.logger.log(`Setting avatar URL for user ${userId} to ${avatarUrl}`);
        return await this.prisma.profile.update({ where, data: { avatarUrl } });
    }

    async createProfile(data: Prisma.ProfileCreateInput): Promise<Profile> {
        return await this.prisma.profile.create({ data });
    }

    async updateProfile(userId: string, data: Prisma.ProfileUpdateInput): Promise<Profile> {
        const where: Prisma.ProfileWhereUniqueInput = { userId };
        return await this.prisma.profile.update({ where, data });
    }

    async deleteProfile(userId: string): Promise<Profile | null> {
        const where: Prisma.ProfileWhereUniqueInput = { userId };
        return await this.prisma.profile.delete({ where });
    }

    async findAllProfiles(): Promise<Profile[]> {
        return await this.prisma.profile.findMany();
    }

    async findProfilesByAvatarUrl(avatarUrl: string): Promise<Profile[]> {
        return await this.prisma.profile.findMany({
            where: {
                avatarUrl: avatarUrl
            }
        });
    }
}
