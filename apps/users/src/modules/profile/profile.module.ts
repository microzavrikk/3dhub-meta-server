import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { PrismaModule } from '../../utils/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [PrismaModule,
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.NATS,
        options: { servers: ['nats://localhost:4222'] },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileRepository, PrismaService],
  exports: [ProfileService]
})
export class ProfileModule {}
