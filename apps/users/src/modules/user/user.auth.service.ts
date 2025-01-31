import { Injectable, Logger } from '@nestjs/common';
import { User } from '../../utils/prisma/types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRegisterDto } from './models/dto/user-register.dto';
import { UserLoginDto } from './models/dto/user.login.dto';
import { UserRepository } from './user.repository';
import { RpcException } from '@nestjs/microservices';
import { ProfileService } from '../profile/profile.service';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Injectable()
export class UserAuthService {
    private readonly logger = new Logger(UserAuthService.name);

    constructor(
        private readonly userRepository: UserRepository,
        private readonly profileService: ProfileService
    ) {}

    async register(data: UserRegisterDto) {
        try {
            const existingUserEmail = await this.userRepository.findUserByEmail(data.email);
            if (existingUserEmail) {
                this.logger.error(`Registration failed: Email ${data.email} already registered`);
                throw new RpcException('Email already registered');
            }

            const existingUserName = await this.userRepository.findUserByUsername(data.username);
            if (existingUserName) {
                this.logger.error(`Registration failed: Username ${data.username} already taken`);
                throw new RpcException('Username already taken');
            }

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);

            const user = await this.userRepository.createUser({
                ...data,
                password: hashedPassword
            });

            if (!user) {
                throw new RpcException('Failed to create user');
            }

            try {
                const profile = await this.profileService.createProfile(user.id);
                this.logger.log(`Profile created for user ${user.id}`);
                
                if (!profile) {
                    this.logger.error(`Failed to create profile for user ${user.id}`);
                    await this.userRepository.deleteUser(user.id);
                    throw new RpcException('Failed to create user profile');
                }
            } catch (profileError: any) {
                this.logger.error(`Failed to create profile: ${profileError.message}`);
                await this.userRepository.deleteUser(user.id);
                throw new RpcException('Failed to create user profile');
            }
            
            this.logger.log(`User successfully registered with profile: ${user.email}`);
            return user;

        } catch (error: any) {
            if (error instanceof RpcException) {
                throw error;
            }
            
            this.logger.error(`Registration failed: ${error.message}`);
            throw new RpcException('Registration failed');
        }
    }

    async login(payload: UserLoginDto): Promise<User> {
        try {
            const user = await this.userRepository.findUserByEmail(payload.email);
            
            if (!user) {
                this.logger.warn(`Login attempt failed: User not found for email ${payload.email}`);
                throw new RpcException('Invalid email or password');
            }

            const valid = await bcrypt.compare(payload.password, user.password);
            
            if (!valid) {
                this.logger.warn(`Login attempt failed: Invalid password for email ${payload.email}`);
                throw new RpcException('Invalid email or password');
            }

            this.logger.log(`User successfully logged in: ${user.email}`);
            return user;
        } catch (error: any) {
            if (error instanceof RpcException) {
                throw error;
            }
            
            this.logger.error(`Login failed: ${error.message}`);
            throw new RpcException('Login failed');
        }
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return !!decoded;
        } catch (error: any) {
            this.logger.warn(`Token verification failed: ${error.message}`);
            return false;
        }
    }
}