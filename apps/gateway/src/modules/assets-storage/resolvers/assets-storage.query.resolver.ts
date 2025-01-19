import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { AssetsStorageQuery } from "../../../utils/graphql/types/graphql";
import { FileOutput } from "../../../utils/graphql/types/graphql";
import { AssetsStorageQueryService } from "../service/assets-storage.query.service";
import { GetFileByUserIdDto } from "../dto/assets-get-by-id.dto"
import { GetFileByUserIdAndFileNameDto } from "../dto/assets-get-by-filename.dto"

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
        @Args('input') input: GetFileByUserIdDto
    ): Promise<FileOutput> {
        const fileData = await this.assetsStorageQueryService.getFileByUserId(input);
        return {
            Body: fileData.Body?.toString() || '',
        }
    }

    @ResolveField('getFileByUserIdAndFileName')
    async getFileByUserIdAndFileName(
        @Args('input') input: GetFileByUserIdAndFileNameDto
    ): Promise<FileOutput> {
        this.logger.log("[getFileByUserIdAndFileName] Get assets request received");
        const fileData = await this.assetsStorageQueryService.getFileByUserIdAndFileName(input);
        return {
            Body: fileData.Body?.toString() || '',
        }
    }
}