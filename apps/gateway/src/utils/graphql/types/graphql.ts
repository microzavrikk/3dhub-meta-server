
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateAssetInput {
    file: Upload;
    name: string;
    description?: Nullable<string>;
    fileKey: string;
    bucketName: string;
    fileSize: number;
    fileType: string;
    tags: string[];
    ownerId: string;
    publicAccess?: Nullable<boolean>;
    thumbnailUrl?: Nullable<string>;
    metadata?: Nullable<JSON>;
}

export class UpdateAssetInput {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    fileKey?: Nullable<string>;
    bucketName?: Nullable<string>;
    fileSize?: Nullable<number>;
    fileType?: Nullable<string>;
    tags?: Nullable<string[]>;
    ownerId?: Nullable<string>;
    publicAccess?: Nullable<boolean>;
    thumbnailUrl?: Nullable<string>;
    metadata?: Nullable<JSON>;
}

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

    abstract AssetsQuery(): Nullable<AssetsStorageQuery> | Promise<Nullable<AssetsStorageQuery>>;
}

export abstract class IMutation {
    abstract createUser(name: string, email: string): User | Promise<User>;

    abstract createPost(title: string, content: string, authorId: string): Post | Promise<Post>;

    abstract AssetsMutation(): Nullable<AssetsStorageMutation> | Promise<Nullable<AssetsStorageMutation>>;

    abstract Auth(): Nullable<AuthMutation> | Promise<Nullable<AuthMutation>>;
}

export class AssetsStorageMutation {
    uploadAsset?: boolean;
    updateAsset?: boolean;
    deleteAsset?: boolean;
}

export class AssetsStorageQuery {
    getAssetById?: Nullable<Asset>;
    getAssetsByUser?: Asset[];
    getAssetsByCategory?: Asset[];
}

export class Asset {
    id: string;
    name: string;
    description?: Nullable<string>;
    fileKey: string;
    bucketName: string;
    fileSize: number;
    fileType: string;
    uploadDate: string;
    updatedAt: string;
    tags: string[];
    ownerId: string;
    publicAccess: boolean;
    thumbnailUrl?: Nullable<string>;
    metadata?: Nullable<JSON>;
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

export type JSON = any;
export type Upload = any;
type Nullable<T> = T | null;
