import { Args, Query, Resolver } from '@nestjs/graphql';
import { Profile } from '../../../utils/graphql/types/graphql';
import { ProfileQueryService } from '../service/profile.service.query';

@Resolver('Profile')
export class ProfileQueryResolver {
  constructor(
    private readonly profileQueryService: ProfileQueryService,
  ) {}

  @Query(() => Profile, { nullable: true })
  async getProfile(@Args('userId') userId: string): Promise<Profile | null> {
    return this.profileQueryService.getProfile(userId);
  }
}
