import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './models/dto/user-create.dto';
import { UpdateUserDto } from './models/dto/user-update.dto'
import { User } from '../../utils/prisma/types';

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        const data = { ...createUserDto };
        return await this.userRepository.createUser(data);
    }

    async searchUsers(query: string): Promise<User[]> {
        return await this.userRepository.searchUsers(query);
    }

    async findAll(): Promise<User[] | null> {
        return await this.userRepository.findAllUsers();
    }

    async findUserByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findUserByUsername(username);
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userRepository.findUserAuthByUserId(id);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
        const data = { ...updateUserDto };
        return await this.userRepository.updateUser(id, data);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.deleteUser(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        this.logger.log(`Finding user by email: ${email}`);
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            this.logger.log(`No user found with email: ${email}`);
        }
        return user;
    }

    async deleteUserByEmail(email: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findUserByEmail(email);
            if (!user) {
                return false;
            }
            await this.userRepository.deleteUserByEmail(email);
            return true;
        } catch (error) {
            this.logger.error(`Failed to delete user with email ${email}:`, error);
            return false;
        }
    }

    async confirmEmail(userId: string): Promise<boolean> {
        this.logger.log(`Received request to confirm email for user ID: ${userId}`);
        return await this.userRepository.confirmEmail(userId);
    }
}