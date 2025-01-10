import { AssetsStorageMutation, CreateAssetInput, UpdateAssetInput } from "../../utils/graphql/types/graphql";
import { Args, Mutation, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { AssetsStorageService } from "./assets-storage.service";

@Resolver(() => AssetsStorageMutation)
export class AssetsStorageMutationResolver {
    private readonly logger = new Logger(AssetsStorageMutationResolver.name);

    constructor(private readonly assetsStorageService: AssetsStorageService) {}

    @Mutation(() => AssetsStorageMutation)
    async AssetsMutation() {
        return {};
    }

    @ResolveField('createAsset')
    async createAsset(@Args('data') data: CreateAssetInput): Promise<boolean> {
        this.logger.log("Create asset request received, data: " + JSON.stringify(data));
        return this.assetsStorageService.createAsset(data);
    }

    @ResolveField('updateAsset')
    async updateAsset(@Args('data') data: UpdateAssetInput): Promise<boolean> {
        this.logger.log("Update asset request received", data);
        return this.assetsStorageService.updateAsset(data);
    }

    @ResolveField('deleteAsset')
    async deleteAsset(@Args('assetId') assetId: string): Promise<boolean> {
        this.logger.log("Delete asset request received, assetId: " + assetId);
        return this.assetsStorageService.deleteAsset(assetId);
    }
}