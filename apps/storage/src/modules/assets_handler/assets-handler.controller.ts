import { MessagePattern, ClientProxy } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { CreateAssetDto } from "./types";
import { AssetsHandlerService } from "./service/assets-handler.service";
import { GetFileByUserIdDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-id.dto';
import { GetFileByUserIdAndFileNameDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-filename.dto';
import { AssetInfo } from '../../../../gateway/src/modules/assets-storage/assets-storage.types';
import { ThirdModel } from '../../utils/prisma/types';
import { AssetOutput } from 'apps/gateway/src/utils/graphql/types/graphql';

@Controller()
export class AssetsHandlerController {
    private readonly logger = new Logger(AssetsHandlerController.name);

    constructor(
        private readonly assetsHandlerService: AssetsHandlerService
    ) {}

    

    @MessagePattern({ cmd: 'upload-asset' })
    async uploadAsset(data: CreateAssetDto, file: Express.Multer.File): Promise<boolean> {

        try {
            try {
                const fs = require('fs');
                const path = require('path');
                const dataToSave = JSON.stringify(data.file, null, 2);
                const filePath = path.join(process.cwd(), 'data_file_beta.txt');
                fs.writeFileSync(filePath, dataToSave);
                this.logger.log(`Data saved to data_file_beta.txt`);
            } catch (err: any) {
                this.logger.error(`Failed to save data to file: ${err.message}`);
            }
            const fileSize = data.file.size;
            this.logger.log(`Uploading file. Size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
            
            await this.assetsHandlerService.createAsset(data, data.file);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to upload asset: ${error.message}`);
            return false;
        }
    }

    @MessagePattern({ cmd: 'search-models-count' })
    async searchModels(query: string): Promise<number> {
        this.logger.log(`Searching models with query: ${query}`);
        try {
            return await this.assetsHandlerService.getModelsCountByName(query);
        } catch (error: any) {
            this.logger.error(`Failed to search models: ${error.message}`);
            return 0;
        }
    }

    @MessagePattern({ cmd: 'delete-all-assets' })
    async deleteAllAssets(data: { username: string }): Promise<boolean> {
        this.logger.log('Deleting all assets for user:', data?.username);
        
        try {
            await this.assetsHandlerService.deleteAllAssets(data?.username);
            return true;
        } catch (error: any) {
            this.logger.error(`Failed to delete all assets: ${error.message}`);
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

    @MessagePattern({ cmd: 'get-random-assets' })
    async getRandomAssets(count: number): Promise<AssetOutput[]> {
        return await this.assetsHandlerService.getRandomAssets(count);
    }

    @MessagePattern({ cmd: 'get-file-by-title-name' })
    async getFileByTitleName(titleName: string): Promise<AssetOutput[]> {
        return await this.assetsHandlerService.getFilesByTitleName(titleName);
    }

    @MessagePattern({ cmd: 'get-all-files-in-database' })
    async getAllFilesInDatabase(): Promise<AssetOutput[]> {
        try {
            return await this.assetsHandlerService.getAllFilesInDatabase();
        } catch (error: any) {
            this.logger.error(`Failed to get all files in database: ${error.message}`);
            return [];
        }
    }

    @MessagePattern({ cmd: 'get-all-file-names-in-database' })
    async getAllFileNamesInDatabase(): Promise<string[]> {
        try {
            return await this.assetsHandlerService.getAllFileNamesInDatabase();
        } catch (error: any) {
            this.logger.error(`Failed to get all file names in database: ${error.message}`);
            return [];
        }
    }
}