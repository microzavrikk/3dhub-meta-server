import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserRegisterDto } from './models/dto/user-register.dto';
import { UserLoginDto } from './models/dto/user.login.dto';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserAuthService {
    async register(payload: UserRegisterDto): Promise<UserRegisterDto> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(payload.password, salt);
        const user = await prisma.user.create({
            data: {
                email: payload.email,
                username: payload.username,
                password: hashedPassword,
                secretKey: salt,
            },
        });

        return user;
    }

    async login(payload: UserLoginDto): Promise<User> {
        const user = await prisma.user.findUnique({ where: { email: payload.email } });
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

