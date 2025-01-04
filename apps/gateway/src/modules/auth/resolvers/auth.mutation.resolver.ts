import { Args, Mutation, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { UserRegisterInput, UserLoginInput, AuthMutation } from "../../../utils/graphql/types/graphql";
import { AuthService } from "../services/auth.service";
import { TokenResponse } from "../types/auth.types";

@Resolver(() => AuthMutation)
export class AuthMutationResolver {
    private readonly logger = new Logger(AuthMutationResolver.name);

    constructor(private authService: AuthService) {}

    @Mutation(() => AuthMutation)
    async Auth() {
        return {};
    }

    @ResolveField('register')
    async register(@Args('data') data: UserRegisterInput): Promise<boolean> {
        return this.authService.register(data);
    }
    
    @ResolveField('login')
    async login(@Args('data') data: UserLoginInput): Promise<TokenResponse> {
        console.log("пришел запрос на регистрацию")
        return this.authService.login(data);
    }
}