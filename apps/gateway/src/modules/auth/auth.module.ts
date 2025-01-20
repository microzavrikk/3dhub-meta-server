import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './decorator/auth.guard';
import { AuthMutationResolver } from './resolvers/auth.mutation.resolver';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersApiModule } from '../../../../users/src/modules/user/user.module';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_TOKEN,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    UsersApiModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthGuard,
    AuthMutationResolver,
    AuthService,
    JwtStrategy,
  ],
  exports: [AuthService], 
})
export class AuthModule {}