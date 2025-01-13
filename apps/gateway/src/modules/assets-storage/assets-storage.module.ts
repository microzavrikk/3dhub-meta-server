import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsStorageController } from "./assets-storage.controller.resolver";
import { AssetsStorageQueryResolver } from "./resolvers/assets-storage.query.resolver";
import { AssetsStorageService } from "./service/assets-storage.mutation.service";
import { AssetsStorageQueryService } from "./service/assets-storage.query.service";

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
  controllers: [AssetsStorageController],
  providers: [
    AssetsStorageQueryResolver,
    AssetsStorageService,
    AssetsStorageQueryService,
  ],
  exports: [
    AssetsStorageService,
    AssetsStorageQueryService,
  ],
})
export class AssetsStorageModule {}