import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../utils/prisma/prisma.service";
import { User, Prisma } from "../../utils/prisma/types";
import { UpdateUserDto } from "./models/dto/user-update.dto";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

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
}