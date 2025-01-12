import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsStorageMutationResolver } from "./assets-storage.mutation.resolver";
import { AssetsStorageQueryResolver } from "./assets-storage.query.resolver";
import { AssetsStorageService } from "./service/assets-storage.mutation.service";

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
  providers: [
    AssetsStorageMutationResolver,
    AssetsStorageQueryResolver,
    AssetsStorageService,
  ],
})
export class AssetsStorageModule {}