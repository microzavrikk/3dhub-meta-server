import { Module } from '@nestjs/common';
import { GlobalSearchQueryResolver } from './global-search.resolver.query';
import { GlobalSearchService } from './global-search.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ASSETS_HANDLER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  providers: [
    GlobalSearchQueryResolver,
    GlobalSearchService
  ]
})
export class GlobalSearchModule {}
