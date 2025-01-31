import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Profile } from '../../../utils/graphql/types/graphql';

@Resolver('Profile')
export class ProfileQueryResolver {
  constructor(
    @Inject('PROFILE_SERVICE') private readonly usersClient: ClientProxy,
  ) {}

  @Query(() => Profile, { nullable: true })
  async getProfile(@Args('userId') userId: string): Promise<Profile | null> {
    return firstValueFrom(
      this.usersClient.send({ cmd: 'profile-get' }, userId),
    );
  }
}
