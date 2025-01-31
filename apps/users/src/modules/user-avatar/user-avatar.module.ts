import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserAvatarService } from './user-avatar.service';
import { UserAvatarController } from './user-avatar.controller'
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    ProfileModule,
    ClientsModule.register([
      {
        name: 'STORAGE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://localhost:4222']
        }
      },
    ])
  ],
  controllers: [UserAvatarController],
  providers: [UserAvatarService],
  exports: [UserAvatarService],
})
export class UserAvatarModule {}
