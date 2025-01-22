import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SearchUserDto } from './dto/search-user.dto';
import { firstValueFrom, TimeoutError } from 'rxjs';
import { Inject } from '@nestjs/common';

@Injectable()
export class SearchUserService {
    private readonly logger = new Logger(SearchUserService.name);

    constructor(
        @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
    ) {}

    async findUserByUsername(username: string) {
        try {
            this.logger.log(`Searching for user by username: ${username}`);
            const user = await firstValueFrom(
                this.userServiceClient.send({ cmd: 'user-find-by-username' }, username)
            );
            if (!user) {
                throw new NotFoundException(`User with username ${username} not found`);
            }
            return user;
        } catch (error: any) {
            this.logger.error(`Error finding user by username: ${error.message}`);
            if (error instanceof TimeoutError) {
                throw new InternalServerErrorException('User service timeout');
            }
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error searching for user');
        }
    }

    async findUserById(id: string) {
        try {
            this.logger.log(`Searching for user by id: ${id}`);
            const user = await firstValueFrom(
                this.userServiceClient.send({ cmd: 'user-find-by-id' }, id)
            );
            if (!user) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            return user;
        } catch (error: any) {
            this.logger.error(`Error finding user by id: ${error.message}`);
            if (error instanceof TimeoutError) {
                throw new InternalServerErrorException('User service timeout');
            }
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error searching for user');
        }
    }

    async findUserByEmail(email: string) {
        try {
            this.logger.log(`Searching for user by email: ${email}`);
            const user = await firstValueFrom(
                this.userServiceClient.send({ cmd: 'user-find-by-email' }, email)
            );
            if (!user) {
                throw new NotFoundException(`User with email ${email} not found`);
            }
            return user;
        } catch (error: any) {
            this.logger.error(`Error finding user by email: ${error.message}`);
            if (error instanceof TimeoutError) {
                throw new InternalServerErrorException('User service timeout');
            }
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error searching for user');
        }
    }

    async findAll() {
        try {
            this.logger.log('Fetching all users');
            const users = await firstValueFrom(
                this.userServiceClient.send({ cmd: 'user-find-all' }, {})
            );
            if (!users || users.length === 0) {
                throw new NotFoundException('No users found');
            }
            return users;
        } catch (error: any) {
            this.logger.error(`Error finding all users: ${error.message}`);
            if (error instanceof TimeoutError) {
                throw new InternalServerErrorException('User service timeout');
            }
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Error fetching users');
        }
    }

    async searchUsers(searchDto: SearchUserDto) {
        try {
            if (searchDto.id) {
                return this.findUserById(searchDto.id);
            }
            if (searchDto.username) {
                return this.findUserByUsername(searchDto.username);
            }
            if (searchDto.email) {
                return this.findUserByEmail(searchDto.email);
            }
            return this.findAll();
        } catch (error: any) {
            this.logger.error(`Error in searchUsers: ${error.message}`);
            throw error;
        }
    }
}
