import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProfileQueryService } from './service/profile.service.query';
import { ProfileMutationService } from './service/profile.service.mutation';
import { ProfileQueryResolver } from './resolvers/profile.resolver.query';
import { ProfileMutationResolver } from './resolvers/profile.resolver.mutation';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PROFILE_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [],
  providers: [
    ProfileQueryService,
    ProfileMutationService,
    ProfileQueryResolver,
    ProfileMutationResolver
  ],
  exports: [ProfileQueryService, ProfileMutationService],
})
export class ProfileModule {}
