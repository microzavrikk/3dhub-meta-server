import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthGuard } from "./decorator/auth.guard";
import { AuthMutationResolver } from "./resolvers/auth.mutation.resolver";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UsersApiModule } from "../../../../users/src/modules/user/user.module";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: process.env.EXPIRES_IN
                },
            }),
        }),
        UsersApiModule 
    ],
    controllers: [],
    providers: [
        AuthGuard,
        AuthMutationResolver,
        AuthService,
        JwtStrategy
    ],
    exports: [AuthService],
})
export class AuthModule {}