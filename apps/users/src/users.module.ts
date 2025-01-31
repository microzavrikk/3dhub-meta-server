import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersApiModule } from './modules/user/user.module';
import { UserAvatarModule } from './modules/user-avatar/user-avatar.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
  imports: [UsersApiModule, UserAvatarModule, ProfileModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

