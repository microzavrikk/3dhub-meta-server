import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../../utils/graphql/types/graphql';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProfileQueryService {
  private readonly logger = new Logger(ProfileQueryService.name);

  constructor(
    @Inject('PROFILE_SERVICE') private readonly profileClient: ClientProxy,
  ) {}

  async getProfile(userId: string): Promise<Profile | null> {
    this.logger.log(`Getting profile for user ${userId}`);
    return firstValueFrom(
      this.profileClient.send({ cmd: 'profile-get' }, userId)
    );
  }
}
