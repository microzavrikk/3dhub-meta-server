import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersApiModule } from './modules/user/user.module';

@Module({
  imports: [UsersApiModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
