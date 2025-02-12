
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
    price: number;
    titleName: string;
    description?: Nullable<string>;
    category: string;
    tags: string[];
    ownerId: string;
    publicAccess?: Nullable<boolean>;
}

export class UpdateAssetInput {
    id: string;
    price: number;
    name?: Nullable<string>;
    titleName?: Nullable<string>;
    description?: Nullable<string>;
    category: string;
    tags?: Nullable<string[]>;
    ownerId?: Nullable<string>;
    publicAccess?: Nullable<boolean>;
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

export class AssetsFilterInput {
    categories?: Nullable<string[]>;
    priceRange?: Nullable<PriceRangeInput>;
    formats?: Nullable<string[]>;
    tags?: Nullable<string[]>;
    sortBy?: Nullable<string>;
    assetName?: Nullable<string>;
    page?: Nullable<number>;
    limit?: Nullable<number>;
}

export class PriceRangeInput {
    min?: Nullable<number>;
    max?: Nullable<number>;
}

export class ProfileInput {
    bio?: Nullable<string>;
    socialLinks?: Nullable<JSON>;
    avatarUrl?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
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

    abstract findAssetsByFilter(input: AssetsFilterInput): AssetsFilterOutput | Promise<AssetsFilterOutput>;

    abstract GlobalSearch(): Nullable<GlobalSearchQuery> | Promise<Nullable<GlobalSearchQuery>>;

    abstract Ping(): Nullable<PingQuery> | Promise<Nullable<PingQuery>>;

    abstract getProfile(userId: string): Nullable<Profile> | Promise<Nullable<Profile>>;

    abstract SearchUser(): Nullable<SearchUserQuery> | Promise<Nullable<SearchUserQuery>>;

    abstract getDefaultFilters(): DefaultFilters | Promise<DefaultFilters>;
}

export abstract class IMutation {
    abstract createUser(name: string, email: string): User | Promise<User>;

    abstract createPost(title: string, content: string, authorId: string): Post | Promise<Post>;

    abstract AssetsMutation(): Nullable<AssetsStorageMutation> | Promise<Nullable<AssetsStorageMutation>>;

    abstract Auth(): Nullable<AuthMutation> | Promise<Nullable<AuthMutation>>;

    abstract updateProfile(userId: string, profile: ProfileInput): Profile | Promise<Profile>;

    abstract setAvatarUrl(userId: string, avatarUrl: string): Profile | Promise<Profile>;

    abstract deleteProfile(userId: string): boolean | Promise<boolean>;

    abstract SetRoles(): Nullable<SetRolesMutation> | Promise<Nullable<SetRolesMutation>>;
}

export class AssetsStorageMutation {
    createAsset?: boolean;
    updateAsset?: boolean;
    deleteAsset?: boolean;
}

export class AssetsStorageQuery {
    getFileByUserId?: FileOutput;
    getFileByUserIdAndFileName?: FileOutput;
    getFileByFileId?: AssetOutput;
    getAllFilesInDatabase: AssetOutput[];
    getAllFileNamesInDatabase: string[];
    getFileByTitleName?: AssetOutput[];
    getRandomAssets?: AssetOutput[];
}

export class AssetOutput {
    id: string;
    file: string[];
    price: number;
    awsLocation: string;
    titleName: string;
    name: string;
    description?: Nullable<string>;
    category: string;
    tags: string[];
    ownerId: string;
    publicAccess?: Nullable<boolean>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class Asset {
    id: string;
    file: Upload;
    price: number;
    titleName: string;
    name: string;
    description?: Nullable<string>;
    category: string;
    tags: string[];
    ownerId: string;
    publicAccess?: Nullable<boolean>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
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
    accessToken: string;
    user: User;
}

export class CategoryQuery {
    getCategories: string[];
    getAllCategoryInS3: string[];
}

export class AssetsFilterOutput {
    assets: AssetOutput[];
    totalCount: number;
}

export class GlobalSearchQuery {
    search?: GlobalSearchResult;
}

export class GlobalSearchResult {
    users: UserSearchResult[];
    modelsCount: number;
    executionTime: number;
}

export class UserSearchResult {
    username: string;
    avatarUrl?: Nullable<string>;
}

export class PingQuery {
    ping: string;
}

export class Profile {
    id: string;
    userId: string;
    avatarUrl?: Nullable<string>;
    backgroundUrl?: Nullable<string>;
    bio?: Nullable<string>;
    socialLinks?: Nullable<JSON>;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class SetRolesMutation {
    setUserRole?: boolean;
}

export class SearchUserQuery {
    searchUsers?: Nullable<User[]>;
    findUserById?: Nullable<User>;
    findUserByEmail?: Nullable<User>;
    findUserByUsername?: Nullable<User>;
    findAllUsers?: Nullable<User[]>;
}

export class DefaultFilters {
    categories: CategoryFilter[];
    priceRange: PriceRange;
    formats: FormatFilter[];
    tags: string[];
    sortOptions: SortOption[];
    assetName: string;
    totalCount: number;
}

export class CategoryFilter {
    id: string;
    name: string;
    count: number;
}

export class FormatFilter {
    format: string;
    count: number;
}

export class PriceRange {
    min: number;
    max: number;
}

export class SortOption {
    value: string;
    label: string;
}

export type JSON = any;
export type Upload = any;
export type DateTime = any;
type Nullable<T> = T | null;
