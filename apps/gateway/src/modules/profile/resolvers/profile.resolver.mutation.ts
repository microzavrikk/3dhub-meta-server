import { Inject } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Profile, ProfileInput } from '../../../utils/graphql/types/graphql';

@Resolver('Profile')
export class ProfileMutationResolver {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Mutation(() => Profile)
  async Profile() {
    return {};
  }

  @ResolveField('updateProfile')
  async updateProfile(
    @Args('userId') userId: string,
    @Args('profile') profile: ProfileInput,
  ): Promise<Profile> {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'profile-update' }, { userId, profile }),
    );
  }

  @ResolveField('setAvatarUrl')
  async setAvatarUrl(
    @Args('userId') userId: string,
    @Args('avatarUrl') avatarUrl: string,
  ): Promise<Profile> {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'profile-set-avatar' }, { userId, avatarUrl }),
    );
  }

  @ResolveField('deleteProfile')
  async deleteProfile(@Args('userId') userId: string): Promise<boolean> {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'profile-delete' }, userId),
    );
  }
}
