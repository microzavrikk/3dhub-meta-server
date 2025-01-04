import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../utils/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UpdateUserDto } from "./models/dto/user-update.dto";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

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
}