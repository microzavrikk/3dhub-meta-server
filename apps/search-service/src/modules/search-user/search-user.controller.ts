import { Controller, Logger } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { SearchUserDto } from "./dto/search-user.dto";
import { SearchUserByIdDto } from "./dto/search-user-by-id.dto"; 
import { SearchUserByEmailDto } from "./dto/search-user-by-email.dto"
import { SearchUserByUsernameDto } from "./dto/search-user-by-username.dto"

@Controller('search-user')
export class SearchUserController {
    private readonly logger = new Logger(SearchUserController.name);

    @MessagePattern('search-user')
    searchUser(data: SearchUserDto) {
        this.logger.log(`Received search request: ${data}`);
        return { message: 'Search request received' };
    }

    @MessagePattern('search-user-by-id')
    searchUserById(data: SearchUserByIdDto) {
        this.logger.log(`Received search request: ${data}`);
        return { message: 'Search request received' };
    }

    @MessagePattern('search-user-by-email')
    searchUserByEmail(data: SearchUserByEmailDto) {
        this.logger.log(`Received search request: ${data}`);
        return { message: 'Search request received' };
    }

    @MessagePattern('search-user-by-username')
    searchUserByUsername(data: SearchUserByUsernameDto) {
        this.logger.log(`Received search request: ${data}`);
        return { message: 'Search request received' };
    }
}   