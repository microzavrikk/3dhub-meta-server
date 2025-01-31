import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserStorageController } from './user-storage.controller';
import { UserStorageService } from './user-storage.service';
import { UserStorageS3Repository } from './user-storage.s3.repository';

@Module({
  imports: [ConfigModule,
    ClientsModule.register([
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      }
    ]),

  ],
  controllers: [UserStorageController],
  providers: [UserStorageService, UserStorageS3Repository],
  exports: [UserStorageService]
})
export class UserStorageModule {}
