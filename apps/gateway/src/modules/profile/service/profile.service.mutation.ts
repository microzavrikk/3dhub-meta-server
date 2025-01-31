import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../../utils/graphql/types/graphql';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProfileMutationService {
  private readonly logger = new Logger(ProfileMutationService.name);

  constructor(
    @Inject('PROFILE_SERVICE') private readonly profileClient: ClientProxy,
  ) {}

  async updateProfile(userId: string, profile: any): Promise<Profile> {
    this.logger.log(`Updating profile for user ${userId}`);
    return firstValueFrom(
      this.profileClient.send({ cmd: 'profile-update' }, { userId, profile })
    );
  }

  async setAvatarUrl(userId: string, avatarUrl: string): Promise<Profile> {
    this.logger.log(`Setting avatar URL for user ${userId}`);
    return firstValueFrom(
      this.profileClient.send({ cmd: 'profile-set-avatar' }, { userId, avatarUrl })
    );
  }

  async deleteProfile(userId: string): Promise<boolean> {
    this.logger.log(`Deleting profile for user ${userId}`);
    return firstValueFrom(
      this.profileClient.send({ cmd: 'profile-delete' }, userId)
    );
  }
}
