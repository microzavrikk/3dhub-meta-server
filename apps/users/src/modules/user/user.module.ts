import { Global, Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserAuthService } from "./user.auth.service";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { PrismaModule } from "../../utils/prisma/prisma.module";
import { ProfileModule } from "../profile/profile.module";

@Global()
@Module({
    imports: [
        PrismaModule,
        ProfileModule,
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://localhost:4222'],
                },
            },
        ]),
        ClientsModule.register([
            {
                name: 'PROFILE_SERVICE',
                transport: Transport.NATS,
                options: {
                    servers: ['nats://localhost:4222'],
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserAuthService, UserRepository],
    exports: [UserService, UserAuthService, ClientsModule],
})
export class UsersApiModule {}