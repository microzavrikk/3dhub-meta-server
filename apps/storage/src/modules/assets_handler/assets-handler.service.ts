import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssetsHandlerRepository } from './assets-handler.repository';
import { AssetsHandlerS3Repository } from './assets-handler.s3.repository';
import { CreateAssetDto, UpdateAssetDto, Asset } from './types';

@Injectable()
export class AssetsHandlerService {
  private readonly logger = new Logger(AssetsHandlerService.name);

  constructor(
    private readonly assetsHandlerRepository: AssetsHandlerRepository,
    private readonly assetsHandlerS3Repository: AssetsHandlerS3Repository,
    private readonly configService: ConfigService,
  ) {}

  async createAsset(data: CreateAssetDto): Promise<Asset> {
    this.logger.log(`Creating asset: ${JSON.stringify(data)}`);

    // Upload file to S3
    const fileKey = `${data.ownerId}/${data.file.originalname}`;
    await this.assetsHandlerS3Repository.uploadFile(data.file, fileKey);

    // Create asset in the database
    const assetData = { ...data, fileKey };
    const asset = await this.assetsHandlerRepository.createAsset(assetData);

    return asset;
  }

  async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
    this.logger.log(`Updating asset: ${JSON.stringify(data)}`);

    // Upload new file to S3 if provided
    if (data.file) {
      const fileKey = `${data.ownerId}/${data.file.originalname}`;
      await this.assetsHandlerS3Repository.uploadFile(data.file, fileKey);
      data.fileKey = fileKey;
    }

    // Update asset in the database
    const asset = await this.assetsHandlerRepository.updateAsset(id, data);

    return asset;
  }

  async deleteAsset(id: string): Promise<void> {
    this.logger.log(`Deleting asset: ${id}`);

    // Get asset from the database
    const asset = await this.assetsHandlerRepository.getAssetById(id);
    if (!asset) {
      throw new Error(`Asset with id ${id} not found`);
    }

    // Delete file from S3
    await this.assetsHandlerS3Repository.deleteFile(asset.fileKey);

    // Delete asset from the database
    await this.assetsHandlerRepository.deleteAsset(id);
  }

  async getAssetById(id: string): Promise<Asset | null> {
    return this.assetsHandlerRepository.getAssetById(id);
  }

  async getAssetsByUser(userId: string): Promise<Asset[]> {
    return this.assetsHandlerRepository.getAssetsByUser(userId);
  }

  async getAssetsByCategory(category: string): Promise<Asset[]> {
    return this.assetsHandlerRepository.getAssetsByCategory(category);
  }
}