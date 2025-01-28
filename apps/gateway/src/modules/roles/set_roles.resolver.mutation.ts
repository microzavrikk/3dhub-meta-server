import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver('SetRolesMutation')
export class SetRolesMutationResolver {
  private readonly logger = new Logger(SetRolesMutationResolver.name);

  @Mutation('setUserRole')
  async setUserRole(
    @Args('username') username: string,
    @Args('newRole') newRole: string,
  ): Promise<boolean> {
    try {
      this.logger.log(`Setting role ${newRole} for user ${username}`);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to set role for user ${username}: ${error.message}`);
      throw error;
    }
  }
}
