import { MessagePattern, ClientProxy } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserFindDto } from "./models/dto/user-find.dto";
import { UserLoginDto } from "./models/dto/user.login.dto";
import { UserRegisterDto } from "./models/dto/user-register.dto";
import { UserAuthService } from "./user.auth.service";
import { User } from "../../utils/prisma/types";
import { Logger } from "@nestjs/common";
import { UserSearchResult } from "apps/gateway/src/utils/graphql/types/graphql";
import { ProfileService } from "../profile/profile.service";
@Controller()
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly userService: UserService,
        private readonly userAuthService: UserAuthService,
        private readonly profileService: ProfileService,
    ) {}

    @MessagePattern({ cmd: 'user-register' })
    async register(data: UserRegisterDto): Promise<User | null> {
        return this.userAuthService.register(data);
    }

    @MessagePattern({ cmd: 'user-login' })
    async login(data: UserLoginDto): Promise<User> {
        this.logger.log(`Received request to login user: ${JSON.stringify(data, null, 2)}`);
        return this.userAuthService.login(data);
    }
    @MessagePattern({ cmd: 'user-delete-account' })
    async deleteAccount(email: string): Promise<boolean> {
        this.logger.log(`Received request to delete user account with email: ${email}`);
        return this.userService.deleteUserByEmail(email);
    }

    @MessagePattern({ cmd: 'user-confirm-email' })
    async confirmEmail(userId: string): Promise<boolean> {
        this.logger.log(`Received request to confirm email for user ID: ${userId}`);
        return this.userService.confirmEmail(userId);
    }
    

    ///////////////////////////////////////////////////////////////////////////////////

    @MessagePattern({ cmd: 'user-search' })
    async search(query: string): Promise<UserSearchResult[]> {
        this.logger.log(`Received request to search users with query: ${query}`);
        const users = await this.userService.searchUsers(query);
        const avatarUrls = await Promise.all(users.map((user) => this.profileService.getAvatarUrl(user.id)));
        const searchResults = users.map((user, index) => ({
            username: user.username,
            avatarUrl: avatarUrls[index],
        }));
        this.logger.log(`Found ${searchResults.length} users`);
        return searchResults;
    }

    @MessagePattern({ cmd: 'user-find-by-username' })
    async findUserByUsername(username: string): Promise<User | null> {
        this.logger.log(`Received request to find user by username: ${username}`);
        const user = await this.userService.findUserByUsername(username);
        this.logger.log(`Found user: ${JSON.stringify(user, null, 2)}`);
        return user;
    }

    @MessagePattern({ cmd: 'user-find-by-id' })
    async findUserById(id: string): Promise<User | null> {
        this.logger.log(`Received request to find user by id: ${id}`);
        const user = await this.userService.findUserById(id);
        this.logger.log(`Found user: ${JSON.stringify(user, null, 2)}`);
        return user;
    }

    @MessagePattern({ cmd: 'user-find-by-email' })
    async findUserByEmail(email: string): Promise<User | null> {
        this.logger.log(`Received request to find user by email: ${email}`);
        const user = await this.userService.findUserByEmail(email);
        this.logger.log(`Found user: ${JSON.stringify(user, null, 2)}`);
        return user;
    }

    @MessagePattern({ cmd: 'user-find-all' })
    async findAll(): Promise<User[] | null> {
        return this.userService.findAll();
    }
}