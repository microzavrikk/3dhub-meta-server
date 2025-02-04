import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FindAssetsByFilterService } from './find-assets-by-filter.service';
import { FindAssetsByFilterQueryResolver } from './find-assets-by-filter.resolver.query';

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
  ],
  providers: [FindAssetsByFilterService, FindAssetsByFilterQueryResolver],
})
export class FindAssetsByFilterModule {}
