import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchUserService } from './search-user.service';
import { SearchUserQueryResolver } from './search-user.mutation.resolver';  

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'SEARCH_USER_SERVICE',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://localhost:4222'],
                }
            },
        ]),
    ],
    providers: [SearchUserService, SearchUserQueryResolver],
    exports: [SearchUserService],
})
export class SearchUserModule {}
