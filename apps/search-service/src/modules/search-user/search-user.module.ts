import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchUserService } from './search-user.service';
import { SearchUserController } from './search-user.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://localhost:4222'],
                }
            },
        ]),
    ],
    providers: [SearchUserService],
    controllers: [SearchUserController],
    exports: [SearchUserService],
})
export class SearchUserModule {} 