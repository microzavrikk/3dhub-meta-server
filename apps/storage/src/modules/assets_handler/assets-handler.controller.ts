import { MessagePattern, ClientProxy } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { CreateAssetDto } from "./types";
import { AssetsHandlerService } from "./service/assets-handler.service";
import { GetFileByUserIdDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-id.dto';
import { GetFileByUserIdAndFileNameDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-filename.dto';
import { AssetInfo } from '../../../../gateway/src/modules/assets-storage/assets-storage.types';
@Controller()
export class AssetsHandlerController {
    private readonly logger = new Logger(AssetsHandlerController.name);

    constructor(
        private readonly assetsHandlerService: AssetsHandlerService
    ) {}

    @MessagePattern({ cmd: 'upload-asset' })
    async uploadAsset(data: CreateAssetDto, file: Express.Multer.File): Promise<boolean> {
        
        try {
            await this.assetsHandlerService.createAsset(data, file);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to upload asset: ${error.message}`);
            return false;
        }
    }
    

    @MessagePattern({ cmd: 'get-file-by-user-id' })
    async getFileByUserId(input: GetFileByUserIdDto): Promise<AWS.S3.GetObjectOutput> {
        try {
            return await this.assetsHandlerService.getFileByUserId(input);
        } catch (error: any) {
            this.logger.error(`Failed to get asset: ${error.message}`);
        }
        return {};
    }

    @MessagePattern({ cmd: 'get-assets-by-user' })
    async getAssetsByUser(userId: string): Promise<AssetInfo[]> {
        try {
            return await this.assetsHandlerService.getAssetsByUser(userId);
        } catch (error: any) {
            this.logger.error(`Failed to get assets: ${error.message}`);
            return [];
        }
    }

    @MessagePattern({ cmd: 'get-file-by-user-id-and-file-name' })
    async getFileByUserIdAndFileName(input: GetFileByUserIdAndFileNameDto): Promise<AWS.S3.GetObjectOutput> {
        try {
            return await this.assetsHandlerService.getFileByUserIdAndFileName(input);
        } catch (error: any) {
            this.logger.error(`Failed to get asset: ${error.message}`);
            return {};
        }
    }

    @MessagePattern({ cmd: 'get-all-category-in-s3' })
    async getAllCategoryInS3(): Promise<string[]> {
        try {
            return await this.assetsHandlerService.getAllCategoryInS3();
        } catch (error: any) {
            this.logger.error(`Failed to get all category in s3: ${error.message}`);
            return [];
        }
    }
}