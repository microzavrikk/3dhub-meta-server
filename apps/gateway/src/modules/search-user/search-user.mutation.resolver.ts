import { Query, Resolver, ResolveField, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { SearchUserService } from './search-user.service';

@Resolver('SearchUserQuery')
export class SearchUserQueryResolver {
    private readonly logger = new Logger(SearchUserQueryResolver.name);

    constructor(private readonly searchUserService: SearchUserService) {}

    @Query('SearchUser')
    SearchUser() {
        return {};
    }

    @ResolveField('searchUsers')
    async searchUsers(@Args('data') data: any) {
        this.logger.log(`Searching users with data: ${JSON.stringify(data)}`);
        return this.searchUserService.searchUsers(data);
    }

    @ResolveField('findUserById')
    async findUserById(@Args('data') data: any) {
        this.logger.log(`Finding user by ID: ${data.id}`);
        return this.searchUserService.findUserById(data.id);
    }

    @ResolveField('findUserByEmail')
    async findUserByEmail(@Args('data') data: any) {
        this.logger.log(`Finding user by email: ${data.email}`);
        return this.searchUserService.findUserByEmail(data.email);
    }

    @ResolveField('findUserByUsername')
    async findUserByUsername(@Args('data') data: any) {
        this.logger.log(`Finding user by username: ${data.username}`);
        return this.searchUserService.findUserByUsername(data.username);
    }

    @ResolveField('findAllUsers')
    async findAllUsers() {
        this.logger.log('Finding all users');
        return this.searchUserService.findAll();
    }
}
