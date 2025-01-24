
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
    category: string;
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
    category: string;
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

export class GetFileByUserIdDto {
    category: string;
    userId: string;
}

export class GetFileByUserIdAndFileNameDto {
    category: string;
    userId: string;
    fileName: string;
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

export class SearchUserInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    id?: Nullable<string>;
}

export class SearchUserByIdInput {
    id: string;
}

export class SearchUserByEmailInput {
    email: string;
}

export class SearchUserByUsernameInput {
    username: string;
}

export class User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
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

    abstract Category(): Nullable<CategoryQuery> | Promise<Nullable<CategoryQuery>>;

    abstract Ping(): Nullable<PingQuery> | Promise<Nullable<PingQuery>>;

    abstract SearchUser(): Nullable<SearchUserQuery> | Promise<Nullable<SearchUserQuery>>;
}

export abstract class IMutation {
    abstract createUser(name: string, email: string): User | Promise<User>;

    abstract createPost(title: string, content: string, authorId: string): Post | Promise<Post>;

    abstract AssetsMutation(): Nullable<AssetsStorageMutation> | Promise<Nullable<AssetsStorageMutation>>;

    abstract Auth(): Nullable<AuthMutation> | Promise<Nullable<AuthMutation>>;
}

export class AssetsStorageMutation {
    createAsset?: boolean;
    updateAsset?: boolean;
    deleteAsset?: boolean;
}

export class AssetsStorageQuery {
    getFileByUserId?: FileOutput;
    getFileByUserIdAndFileName?: FileOutput;
}

export class Asset {
    file: Upload;
    id: string;
    name: string;
    description?: Nullable<string>;
    category: string;
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

export class FileOutput {
    Body: string;
}

export class AuthMutation {
    register?: AuthPayload;
    login?: AuthPayload;
    deleteAccount?: boolean;
}

export class TokenResponse {
    accessToken: string;
}

export class AuthPayload {
    token: string;
    user: User;
}

export class CategoryQuery {
    getCategories: string[];
    getAllCategoryInS3: string[];
}

export class PingQuery {
    ping: string;
}

export class SearchUserQuery {
    searchUsers?: Nullable<User[]>;
    findUserById?: Nullable<User>;
    findUserByEmail?: Nullable<User>;
    findUserByUsername?: Nullable<User>;
    findAllUsers?: Nullable<User[]>;
}

export type JSON = any;
export type Upload = any;
type Nullable<T> = T | null;
