import { Injectable } from '@nestjs/common';
import { User } from '../../utils/prisma/types';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRegisterDto } from './models/dto/user-register.dto';
import { UserLoginDto } from './models/dto/user.login.dto';
import { UserRepository } from './user.repository';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

@Injectable()
export class UserAuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async register(payload: UserRegisterDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        
        const userData = {
            email: payload.email,
            username: payload.username,
            password: hashedPassword,
            secretKey: salt,
        };

        const user = await this.userRepository.createUser(userData);
        
        if (!user) {
            throw new Error('Failed to create user');
        }

        return user;
    }

    async login(payload: UserLoginDto): Promise<User> {
        const user = await this.userRepository.findUserByUsername(payload.email);
        
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const valid = await bcrypt.compare(payload.password, user.password);
        
        if (!valid) {
            throw new Error('Invalid email or password');
        }

        return user;
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            return !!decoded;
        } catch (error) {
            return false;
        }
    }
}