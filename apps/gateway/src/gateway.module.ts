import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { GraphqlModule } from './graphql/graphql.module';
import { SessionModule } from './modules/session/session.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsStorageModule } from './modules/assets-storage/assets-storage.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        }
      },
    ]),
    GraphqlModule,
    SessionModule,
    AuthModule,
    AssetsStorageModule
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}