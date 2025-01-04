import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
    @Field()
    accessToken: string;
}

@ObjectType()
export class AuthMutation {
    @Field(() => Boolean, { nullable: true })
    register?: boolean;

    @Field(() => TokenResponse, { nullable: true })
    login?: TokenResponse;
}

@InputType()
export class UserRegisterInput {
    @Field()
    email: string;

    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
export class UserLoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}