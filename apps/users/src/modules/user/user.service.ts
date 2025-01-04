import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './models/dto/user-create.dto';
import { UpdateUserDto } from './models/dto/user-update.dto'
import { User } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User | null> {
        const data = { ...createUserDto };
        return await this.userRepository.createUser(data);
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
}