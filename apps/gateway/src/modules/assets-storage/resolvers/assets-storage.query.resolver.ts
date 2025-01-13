import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { AssetsStorageQuery } from "../../../utils/graphql/types/graphql";
import { FileOutput } from "../../../utils/graphql/types/graphql";
import { AssetsStorageQueryService } from "../service/assets-storage.query.service";

@Resolver(() => AssetsStorageQuery)
export class AssetsStorageQueryResolver {
    private readonly logger = new Logger(AssetsStorageQueryResolver.name);

    constructor(private readonly assetsStorageQueryService: AssetsStorageQueryService) {}

    @Query(() => AssetsStorageQuery)
    async AssetsQuery() {
        return {};
    }

    @ResolveField('getFileByUserId')
    async getFileByUserId(
        @Args('category') category: string, 
        @Args('userId') userId: string
    ): Promise<FileOutput> {
        this.logger.log("[getFileByUserId] Get asset request received");
        const fileData = await this.assetsStorageQueryService.getFileByUserId(category, userId);
        return {
            Body: fileData.Body?.toString() || '',
        }
    }

    @ResolveField('getFileByUserIdAndFileName')
    async getFileByUserIdAndFileName(
        @Args('category') category: string,
        @Args('userId') userId: string,
        @Args('fileName') fileName: string
    ): Promise<FileOutput> {
        this.logger.log("[getFileByUserIdAndFileName] Get assets request received");
        const fileData = await this.assetsStorageQueryService.getFileByUserIdAndFileName(category, userId, fileName);
        return {
            Body: fileData.Body?.toString() || '',
        }
    }
}