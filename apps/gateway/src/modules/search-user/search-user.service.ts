import { Injectable, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class SearchUserService {
    private readonly logger = new Logger(SearchUserService.name);

    constructor(
        @Inject('SEARCH_USER_SERVICE') private readonly client: ClientProxy
    ) {}

    async searchUsers(data: { username?: string; email?: string; id?: string }) {
        this.logger.log(`Sending search users request with data: ${JSON.stringify(data)}`);
        return this.client.send('search-user', data).toPromise();
    }

    async findUserById(id: string) {
        this.logger.log(`Sending find user by ID request: ${id}`);
        return this.client.send('search-user-by-id', { id }).toPromise();
    }

    async findUserByEmail(email: string) {
        this.logger.log(`Sending find user by email request: ${email}`);
        return this.client.send('search-user-by-email', { email }).toPromise();
    }

    async findUserByUsername(username: string) {
        this.logger.log(`Sending find user by username request: ${username}`);
        return this.client.send('search-user-by-username', { username }).toPromise();
    }

    async findAll() {
        this.logger.log('Sending find all users request');
        return this.client.send('search-user', {}).toPromise();
    }
}
