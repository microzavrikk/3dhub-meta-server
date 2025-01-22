import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SearchUserDto } from "./dto/search-user.dto";
import { SearchUserByIdDto } from "./dto/search-user-by-id.dto"; 
import { SearchUserByEmailDto } from "./dto/search-user-by-email.dto"
import { SearchUserByUsernameDto } from "./dto/search-user-by-username.dto"
import { SearchUserService } from "./search-user.service";

@Controller('search-user')
export class SearchUserController {
    private readonly logger = new Logger(SearchUserController.name);

    constructor(private readonly searchUserService: SearchUserService) {}

    @MessagePattern('search-user')
    async searchUser(data: SearchUserDto) {
        this.logger.log(`Received search request: ${JSON.stringify(data)}`);
        return this.searchUserService.searchUsers(data);
    }

    @MessagePattern('search-user-by-id')
    async searchUserById(data: SearchUserByIdDto) {
        this.logger.log(`Received search request: ${JSON.stringify(data)}`);
        return this.searchUserService.findUserById(data.id);
    }

    @MessagePattern('search-user-by-email')
    async searchUserByEmail(data: SearchUserByEmailDto) {
        this.logger.log(`Received search request: ${JSON.stringify(data)}`);
        return this.searchUserService.findUserByEmail(data.email);
    }

    @MessagePattern('search-user-by-username')
    async searchUserByUsername(data: SearchUserByUsernameDto) {
        this.logger.log(`Received search request: ${JSON.stringify(data)}`);
        return this.searchUserService.findUserByUsername(data.username);
    }
}   