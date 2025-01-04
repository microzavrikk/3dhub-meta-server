import { ObjectType, InputType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthMutation {
    @Field(() => Boolean)
    register!: boolean;

    @Field(() => TokenResponse)
    login!: TokenResponse;
}

@InputType()
export class UserRegisterInput {
    @Field()
    email!: string;

    @Field()
    username!: string;

    @Field()
    password!: string;
}

@InputType()
export class UserLoginInput {
    @Field()
    email!: string;

    @Field()
    password!: string;
}

@ObjectType()
export class TokenResponse {
    @Field()
    accessToken!: string;
}