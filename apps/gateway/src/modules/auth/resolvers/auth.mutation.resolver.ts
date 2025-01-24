import { Args, Mutation, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { UserRegisterInput, UserLoginInput, AuthMutation } from "../../../utils/graphql/types/graphql";
import { AuthService } from "../services/auth.service";
import { TokenResponse } from "../types/auth.types";
import { AuthPayload } from "../types/auth.types";

@Resolver(() => AuthMutation)
export class AuthMutationResolver {
    private readonly logger = new Logger(AuthMutationResolver.name);

    constructor(private authService: AuthService) {}

    @Mutation(() => AuthMutation)
    async Auth() {
        return {};
    }

    @ResolveField('register')
    async register(@Args('data') data: UserRegisterInput): Promise<AuthPayload> {
        this.logger.log("Register request received");
        const returnData = await this.authService.register(data);
        this.logger.log(JSON.stringify(returnData, null, 2));
        return returnData;
    }
    
    @ResolveField('login')
    async login(@Args('data') data: UserLoginInput): Promise<AuthPayload> {
        this.logger.log("Login request received");
        const returnData = await this.authService.login(data);
        this.logger.log(JSON.stringify(returnData, null, 2));
        return returnData;
    }

    @ResolveField('deleteAccount')
    async deleteAccount(@Args('email') email: string): Promise<boolean> {
        return this.authService.deleteAccount(email);
    }
}