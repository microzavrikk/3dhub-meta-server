import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { AssetsStorageQuery } from "../../../utils/graphql/types/graphql";
import { FileOutput } from "../../../utils/graphql/types/graphql";
import { AssetsStorageQueryService } from "../service/assets-storage.query.service";
import { GetFileByUserIdDto } from "../dto/assets-get-by-id.dto"
import { GetFileByUserIdAndFileNameDto } from "../dto/assets-get-by-filename.dto"
import { AssetOutput } from "../../../utils/graphql/types/graphql";

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

    @ResolveField('getFileByTitleName')
    async getFileByTitleName(
        @Args('titleName') titleName: string
    ): Promise<AssetOutput[]> {
        this.logger.log(`Getting file by titleName: ${titleName}`);
        const fileData = await this.assetsStorageQueryService.getFileByTitleName(titleName);
        return fileData;
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

    @ResolveField('getAllFilesInDatabase')
    async getAllFilesInDatabase(): Promise<AssetOutput[]> {
        const fileData = await this.assetsStorageQueryService.getAllFilesInDatabase();
        return fileData;
    }

    @ResolveField('getAllFileNamesInDatabase')
    async getAllFileNamesInDatabase(): Promise<string[]> {
        const fileData = await this.assetsStorageQueryService.getAllFileNamesInDatabase();
        return fileData;
    }
}