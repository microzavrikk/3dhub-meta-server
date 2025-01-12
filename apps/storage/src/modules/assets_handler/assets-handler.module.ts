import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AssetsHandlerService } from './assets-handler.service';
import { AssetsHandlerController } from './assets-handler.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
        {
            name: 'ASSETS_HANDLER_SERVICE',
            transport: Transport.NATS,
            options: {
                servers: ['nats://localhost:4222'],
            },
        }
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AssetsHandlerController],
  providers: [AssetsHandlerService],
})
export class AssetsHandlerModule {}