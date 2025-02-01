import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../utils/prisma/prisma.service";
import { User, Prisma } from "../../utils/prisma/types";
import { UpdateUserDto } from "./models/dto/user-update.dto";
import { Logger } from "@nestjs/common";
import { UserSearchResult } from "apps/gateway/src/utils/graphql/types/graphql";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserService } from "./user.service";

@Injectable()
export class UserRepository {
    private readonly logger = new Logger(UserRepository.name);

    constructor(private readonly prisma: PrismaService, 
        @Inject ('PROFILE_SERVICE') private readonly client: ClientProxy,
    ) {}

    async searchUsers(query: string): Promise<User[]> {
        const users = await this.prisma.user.findMany({ where: { username: { contains: query } } });
        return users;
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { username };
        return await this.prisma.user.findFirst({ where });
    }

    async findUserAuthByUserId(userId: string): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { id: userId };
        return await this.prisma.user.findFirst({ where });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User | null> {
        return await this.prisma.user.create({ data });
    }

    async updateUser(userId: string, data: UpdateUserDto): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { id: userId };
        return await this.prisma.user.update({ where, data });
    }

    async deleteUser(userId: string): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { id: userId };
        return await this.prisma.user.delete({ where });
    }

    async findAllUsers(): Promise<User[] | null> {
        return await this.prisma.user.findMany();
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { email };
        return await this.prisma.user.findFirst({ where });
    }

    async deleteUserByEmail(email: string): Promise<User | null> {
        const where: Prisma.UserWhereUniqueInput = { email };
        return await this.prisma.user.delete({ where });
    }

    async confirmEmail(userId: string): Promise<boolean> {
        this.logger.log(`Confirming email for user ID: ${userId}`);
        try {
            const where: Prisma.UserWhereUniqueInput = { id: userId };
            await this.prisma.user.update({ where, data: { isVerified: true } });
            this.logger.log(`Email confirmed successfully for user ID: ${userId}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to confirm email for user ID: ${userId}`, error);
            return false;
        }
    }
}