import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchGenerateService } from './search_generate.service';
import { SearchGenerateQueryResolver } from './search_generate.resolver.query';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ASSETS_HANDLER_SERVICE',
        transport: Transport.NATS,
        options: {
            servers: ['nats://localhost:4222'],
        }
      }
    ])
  ],
  providers: [SearchGenerateService, SearchGenerateQueryResolver]
})
export class SearchGenerateModule {}
