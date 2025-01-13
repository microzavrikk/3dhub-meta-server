import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AssetsHandlerRepository } from './assets-handler.repository';
import { AssetsHandlerS3Repository } from './assets-handler.s3.repository';
import { CreateAssetDto, UpdateAssetDto, Asset } from './types';
import * as AWS from 'aws-sdk';


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

    const fileKey = `${data.category}/${data.ownerId}/${data.name}`;
    await this.assetsHandlerS3Repository.uploadFile(data.file, fileKey);

    const assetData = { ...data, fileKey };
    const asset = await this.assetsHandlerRepository.createAsset(assetData);

    return asset;
  }

  async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
    this.logger.log(`Updating asset: ${JSON.stringify(data)}`);

    if (data.file) {
      const fileKey = `${data.ownerId}/${data.name}`;
      await this.assetsHandlerS3Repository.uploadFile(data.file, fileKey);
      data.fileKey = fileKey;
    }

    const asset = await this.assetsHandlerRepository.updateAsset(id, data);

    return asset;
  }

  async deleteAsset(id: string): Promise<void> {
    this.logger.log(`Deleting asset: ${id}`);

    const asset = await this.assetsHandlerRepository.getAssetById(id);
    if (!asset) {
      throw new Error(`Asset with id ${id} not found`);
    }

    await this.assetsHandlerS3Repository.deleteFile(asset.fileKey);

    await this.assetsHandlerRepository.deleteAsset(id);
  }

  async getFileByUserId(category: string, userId: string): Promise<AWS.S3.GetObjectOutput> {
    return this.assetsHandlerS3Repository.getFileByUserId(category, userId);
  }

  async getFileByUserIdAndFileName(category: string, userId: string, filename: string): Promise<AWS.S3.GetObjectOutput> {
    return this.assetsHandlerS3Repository.getFileByUserIdAndFileName(category, userId, filename);
  }
}