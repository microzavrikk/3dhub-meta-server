import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GraphqlModule } from './graphql/graphql.module';
import { SessionModule } from './modules/session/session.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsStorageModule } from './modules/assets-storage/assets-storage.module';
import { CategoryModule } from './modules/category/category.module';
import { PingModule } from './modules/ping/ping.module';
import { SearchUserModule } from './modules/search-user/search-user.module';
import { UserAvatarModule } from './modules/user-avatar/user-avatar.module';

@Module({
  imports: [
    GraphqlModule,
    SessionModule,
    AuthModule,
    AssetsStorageModule,
    CategoryModule,
    PingModule,
    SearchUserModule,
    UserAvatarModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}