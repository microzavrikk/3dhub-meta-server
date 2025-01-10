import { MessagePattern, ClientProxy } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { User } from "@prisma/client";
import { Logger } from "@nestjs/common";
import { CreateAssetDto, UpdateAssetDto, Asset, AssetCategory } from './types'
import { AssetsHandlerService } from "./assets-handler.service";

@Controller()
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(
        private readonly assetsHandlerService: AssetsHandlerService
    ) {}

    @MessagePattern({ cmd: 'upload-asset' })
    async uploadAsset(data: CreateAssetDto): Promise<boolean> {
        return true;
    }

    @MessagePattern({ cmd: 'update-asset' })
    async updateAsset(data: UpdateAssetDto): Promise<boolean> {
        return true;
    }

    @MessagePattern({ cmd: 'delete-asset' })
    async deleteAsset(assetId: string): Promise<boolean> {
        return true;
    }

    @MessagePattern({ cmd: 'get-asset-by-id' })
    async getAssetById(assetId: string): Promise<Asset | null> {
        // Logic to get an asset by its ID
        return null; // Placeholder return value
    }

    @MessagePattern({ cmd: 'get-assets-by-user' })
    async getAssetsByUser(userId: string): Promise<Asset[]> {
        // Logic to get all assets by a specific user
        return []; // Placeholder return value
    }

    async getAssetsByCategory(category: AssetCategory): Promise<Asset[]> {
        // Logic to get all assets by category
        return []; // Placeholder return value
    }
}