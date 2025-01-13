import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { AssetsHandlerService } from './assets-handler.service';
import { AssetsHandlerController } from './assets-handler.controller';
import { AssetsHandlerRepository } from './assets-handler.repository';
import { AssetsHandlerS3Repository } from './assets-handler.s3.repository';
import { PrismaModule } from '../../utils/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'ASSETS_HANDLER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
    PrismaModule,
  ],
  controllers: [AssetsHandlerController],
  providers: [
    AssetsHandlerService,
    AssetsHandlerRepository,
    AssetsHandlerS3Repository,
  ],
  exports: [AssetsHandlerService],
})
export class AssetsHandlerModule {}