import { AssetsStorageQuery } from "../../../utils/graphql/types/graphql";
import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";

@Resolver(() => AssetsStorageQuery)
export class AssetsStorageQueryResolver {
    private readonly logger = new Logger(AssetsStorageQueryResolver.name);
    
    @Query('AssetsQuery')
    async query() {

    }

    @ResolveField('getAssetById')
    async getAsset(@Args('id') id: string) {
        this.logger.log("Get asset request received, id: " + id);
        return {};
    }

    @ResolveField('getAssetsByUser')
    async getAssets() {
        this.logger.log("Get assets request received");
        return [];
    }

    @ResolveField('getAssetsByCategory')
    async getAssetUrl(@Args('id') id: string) {
        this.logger.log("Get asset url request received, id: " + id);
        return "";
    }
}