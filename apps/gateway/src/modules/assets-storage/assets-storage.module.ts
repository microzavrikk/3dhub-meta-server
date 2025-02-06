import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsStorageQueryResolver } from "./resolvers/assets-storage.query.resolver";
import { AssetsStorageService } from "./service/assets-storage.mutation.service";
import { AssetsStorageQueryService } from "./service/assets-storage.query.service";
import { MulterModule } from "@nestjs/platform-express";
import { AssetsStorageMutationController } from "./controllers/assets-storage.mutation.controller";
import { AssetsStorageQueryController } from "./controllers/assets-storage.query.controller";

@Module({
  imports: [
    MulterModule.register({ dest: './uploads' }),
    ClientsModule.register([
      {
        name: 'ASSETS_HANDLER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
          maxPayload: 104857600, // 100MB max payload size
        },
      },
    ]),
  ],
  controllers: [AssetsStorageMutationController, AssetsStorageQueryController],
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