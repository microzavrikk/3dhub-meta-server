import { MessagePattern, ClientProxy } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { CreateAssetDto, UpdateAssetDto, Asset, AssetCategory } from './types';
import { AssetsHandlerService } from "./assets-handler.service";

@Controller()
export class AssetsHandlerController {
    private readonly logger = new Logger(AssetsHandlerController.name);

    constructor(
        private readonly assetsHandlerService: AssetsHandlerService
    ) {}

    @MessagePattern({ cmd: 'upload-asset' })
    async uploadAsset(data: CreateAssetDto): Promise<boolean> {
        this.logger.log(`Uploading asset: ${JSON.stringify(data)}`);
        try {
            await this.assetsHandlerService.createAsset(data);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to upload asset: ${error.message}`);
            return false;
        }
    }

    @MessagePattern({ cmd: 'update-asset' })
    async updateAsset(data: UpdateAssetDto): Promise<boolean> {
        try {
            await this.assetsHandlerService.updateAsset(data.id, data);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to update asset: ${error.message}`);
            return false;
        }
    }

    @MessagePattern({ cmd: 'get-file-by-user-id' })
    async getFileByUserId(category: string, userId: string): Promise<AWS.S3.GetObjectOutput> {
        try {
            return await this.assetsHandlerService.getFileByUserId(category, userId);
        } catch (error: any) {
            this.logger.error(`Failed to get asset: ${error.message}`);
        }
        return { }
    }

    @MessagePattern({ cmd: 'get-file-by-user-id-and-file-name' })
    async getFileByUserIdAndFileName(category: string, userId: string, filename: string): Promise<AWS.S3.GetObjectOutput> {
        try {
            return await this.assetsHandlerService.getFileByUserIdAndFileName(category, userId, filename);
        } catch (error: any) {
            this.logger.error(`Failed to get asset: ${error.message}`);
            return { }
        }
    }
}