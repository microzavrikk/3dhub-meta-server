
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UserRegisterInput {
    email: string;
    username: string;
    password: string;
}

export class UserLoginInput {
    email: string;
    password: string;
}

export class User {
    id: string;
    name: string;
    email: string;
}

export class Post {
    id: string;
    title: string;
    content: string;
    author?: Nullable<User>;
}

export abstract class IQuery {
    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getPosts(): Post[] | Promise<Post[]>;
}

export abstract class IMutation {
    abstract createUser(name: string, email: string): User | Promise<User>;

    abstract createPost(title: string, content: string, authorId: string): Post | Promise<Post>;

    abstract Auth(): Nullable<AuthMutation> | Promise<Nullable<AuthMutation>>;
}

export class AuthMutation {
    register?: boolean;
    login?: TokenResponse;
}

export class TokenResponse {
    accessToken: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

type Nullable<T> = T | null;
