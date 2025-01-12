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

    @MessagePattern({ cmd: 'delete-asset' })
    async deleteAsset(assetId: string): Promise<boolean> {
        try {
            await this.assetsHandlerService.deleteAsset(assetId);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to delete asset: ${error.message}`);
            return false;
        }
    }

    @MessagePattern({ cmd: 'get-asset-by-id' })
    async getAssetById(assetId: string): Promise<Asset | null> {
        try {
            return await this.assetsHandlerService.getAssetById(assetId);
        } catch (error: any) {
            this.logger.error(`Failed to get asset by ID: ${error.message}`);
            return null;
        }
    }

    @MessagePattern({ cmd: 'get-assets-by-user' })
    async getAssetsByUser(userId: string): Promise<Asset[]> {
        try {
            return await this.assetsHandlerService.getAssetsByUser(userId);
        } catch (error: any) {
            this.logger.error(`Failed to get assets by user: ${error.message}`);
            return [];
        }
    }

    @MessagePattern({ cmd: 'get-assets-by-category' })
    async getAssetsByCategory(category: AssetCategory): Promise<Asset[]> {
        try {
            return await this.assetsHandlerService.getAssetsByCategory(category.category);
        } catch (error: any) {
            this.logger.error(`Failed to get assets by category: ${error.message}`);
            return [];
        }
    }
}