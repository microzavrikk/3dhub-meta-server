import { Controller, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors, Logger } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsStorageService } from './service/assets-storage.mutation.service';
import { CreateAssetInput, UpdateAssetInput } from '../../utils/graphql/types/graphql';

@Controller('assets')
export class AssetsStorageController {
    private readonly logger = new Logger(AssetsStorageController.name);

    constructor(private readonly assetsStorageService: AssetsStorageService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async createAsset(
        @Body() data: CreateAssetInput,
        @UploadedFile() file: Express.Multer.File
    ): Promise<boolean> {
        this.logger.log("Create asset request received, data: " + JSON.stringify(data));
        return this.assetsStorageService.createAsset({ ...data, file });
    }

    @Put(':id')
    async updateAsset(@Param('id') id: string, @Body() data: UpdateAssetInput): Promise<boolean> {
        this.logger.log("Update asset request received, data: " + JSON.stringify(data));
        return this.assetsStorageService.updateAsset({ ...data, id });
    }

    @Delete(':id')
    async deleteAsset(@Param('id') id: string): Promise<boolean> {
        this.logger.log("Delete asset request received, assetId: " + id);
        return this.assetsStorageService.deleteAsset(id);
    }
}