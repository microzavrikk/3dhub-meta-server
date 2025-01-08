import { AssetsStorageMutation, CreateAssetInput, UpdateAssetInput } from "../../utils/graphql/types/graphql";
import { Args, Mutation, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";

@Resolver(() => AssetsStorageMutation)
export class AssetsStorageMutationResolver {
    private readonly logger = new Logger(AssetsStorageMutationResolver.name);

    @Mutation(() => AssetsStorageMutation)
    async AssetsMutation() {
        return {};
    }

    @ResolveField('createAsset')
    async createAsset(@Args('data') data: CreateAssetInput): Promise<boolean> {
        this.logger.log("Create asset request received, data: " + JSON.stringify(data));
        return true;
    }

    @ResolveField('updateAsset')
    async updateAsset(@Args('data') data: UpdateAssetInput): Promise<boolean> {
        this.logger.log("Update asset request received", data);
        return true;
    }
}