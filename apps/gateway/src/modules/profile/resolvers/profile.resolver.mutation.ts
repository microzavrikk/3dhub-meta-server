import { Args, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { Profile, ProfileInput } from '../../../utils/graphql/types/graphql';
import { ProfileMutationService } from '../service/profile.service.mutation';

@Resolver('Mutation')
export class ProfileMutationResolver {
  constructor(private readonly profileMutationService: ProfileMutationService) {}

  @Mutation(() => Profile)
  async updateProfile(
    @Args('userId') userId: string,
    @Args('profile') profile: ProfileInput
  ): Promise<Profile> {
    return this.profileMutationService.updateProfile(userId, profile);
  }

  @Mutation(() => Profile)
  async setAvatarUrl(
    @Args('userId') userId: string,
    @Args('avatarUrl') avatarUrl: string
  ): Promise<Profile> {
    return this.profileMutationService.setAvatarUrl(userId, avatarUrl);
  }

  @Mutation(() => Boolean)
  async deleteProfile(@Args('userId') userId: string): Promise<boolean> {
    return this.profileMutationService.deleteProfile(userId);
  }
}
