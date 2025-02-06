import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { AssetsHandlerRepository } from '../repository/assets-handler.repository';
import { AssetsHandlerS3Repository } from '../repository/assets-handler.s3.repository';
import { CreateAssetDto, UpdateAssetDto, Asset } from '../types';
import * as AWS from 'aws-sdk';
import { GetFileByUserIdDto } from '../../../../../gateway/src/modules/assets-storage/dto/assets-get-by-id.dto';
import { GetFileByUserIdAndFileNameDto } from '../../../../../gateway/src/modules/assets-storage/dto/assets-get-by-filename.dto';
import { AssetInfo } from 'apps/gateway/src/modules/assets-storage/assets-storage.types';
import { AssetOutput } from 'apps/gateway/src/utils/graphql/types/graphql';

@Injectable()
export class AssetsHandlerService {
  private readonly logger = new Logger(AssetsHandlerService.name);

  constructor(
    private readonly assetsHandlerRepository: AssetsHandlerRepository,
    private readonly assetsHandlerS3Repository: AssetsHandlerS3Repository,
    private readonly configService: ConfigService,
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async getFilesByTitleName(titleName: string): Promise<AssetOutput[]> {
    this.logger.log(`Getting file by titleName: ${titleName}`);
    const fileData = await this.assetsHandlerRepository.getFilesByTitleName(titleName);
    this.logger.log(`File data: ${JSON.stringify(fileData, null, 2)}`);
    return fileData;
  }

  async getAllFilesInDatabase(): Promise<AssetOutput[]> {
    return this.assetsHandlerRepository.getAllFilesInDatabase();
  }

  async getAllFileNamesInDatabase(): Promise<string[]> {
    return this.assetsHandlerRepository.getAllFileNamesInDatabase();
  }

  async getModelsCountByName(query: string): Promise<number> {
    const models = await this.assetsHandlerRepository.searchModels(query);
    return models;
  }

  async deleteAllAssets(username: string): Promise<boolean> {
    try {
      await this.assetsHandlerS3Repository.deleteAllAssets(username);
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to delete all assets: ${error.message}`);
      return false;
    }
  }
  async createAsset(data: CreateAssetDto, file: Express.Multer.File): Promise<Asset> {    
    try {
      if (!data.file) {
        throw new Error('File is required');
      }

      const fileSize = data.file.size;
      this.logger.log(`File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);

      // Save data to data.txt
      const fs = require('fs');
      const path = require('path');
      
      try {
        const dataToSave = JSON.stringify(data, null, 2);
        const filePath = path.join(process.cwd(), 'data.txt');
        fs.writeFileSync(filePath, dataToSave);
        this.logger.log(`Data saved to data.txt`);
      } catch (err: any) {
        this.logger.error(`Failed to save data to file: ${err.message}`);
      }
      if (!data.newAsset.category || !data.newAsset.username || !data.newAsset.name) {

      }
      
      const fileKey = `${data.newAsset.category}/${data.newAsset.username}/${data.newAsset.name}/${data.file.originalname}`;
      this.logger.log(`Generated fileKey: ${fileKey}`);

      const awsLink = await this.assetsHandlerS3Repository.uploadFile(data, fileKey, file);

      this.logger.log(`AWS Link: ${JSON.stringify(awsLink, null, 2)}`);

      const assetData = { 
        ...data,
        newAsset: {
          ...data.newAsset,
          fileKey
        }
      };

      return this.assetsHandlerRepository.createAsset(assetData, awsLink.Location);
    } catch (error: any) {
      this.logger.error(`Failed to create asset: ${error.message}`);
      throw error;
    }
  }

  async getAssetsByUser(userId: string): Promise<AssetInfo[]> {
    this.logger.log(`Getting assets by userId: ${userId}`);
    const assets = await this.assetsHandlerS3Repository.getAssetsByUser(userId);
    this.logger.log(assets);
    return assets;
  }

  async getAllCategoryInS3(): Promise<string[]> {
    return this.assetsHandlerS3Repository.getAllCategoryInS3();
  }

  //async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
  //  this.logger.log(`Updating asset: ${JSON.stringify(data)}`);
  //
  //  if (data.file) {
  //   const fileKey = `${data.ownerId}/${data.name}`;
  //  await this.assetsHandlerS3Repository.uploadFile(data);
  //   data.fileKey = fileKey;
  // }

  // const asset = await this.assetsHandlerRepository.updateAsset(id, data);

  //  return asset;
  //}

  async deleteAsset(id: string): Promise<void> {
    this.logger.log(`Deleting asset: ${id}`);

    const asset = await this.assetsHandlerRepository.getAssetById(id);
    if (!asset) {
      throw new Error(`Asset with id ${id} not found`);
    }

    await this.assetsHandlerS3Repository.deleteFile(asset.fileKey);

    await this.assetsHandlerRepository.deleteAsset(id);
  }

  async getFileByUserId(input: GetFileByUserIdDto): Promise<AWS.S3.GetObjectOutput> {
    try {
      const categories = await this.client.send({ cmd: 'get-categories' }, {}).toPromise();
      if (!categories.includes(input.category)) {
        throw new Error(`Category ${input.category} not found`);
      } else {
      }
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId: ${error.message}`);
      throw new Error(`Failed to get file by userId: ${error.message}`);
    }
    return this.assetsHandlerS3Repository.getFileByUserId(input.category, input.userId);
  }

  async getFileByUserIdAndFileName(input: GetFileByUserIdAndFileNameDto): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${input.userId}, fileName: ${input.filename} in category: ${input.category}`);
    try {
      const categories = await this.client.send({ cmd: 'get-categories' }, {}).toPromise();
      if (!categories.includes(input.category)) {
        throw new Error(`Category ${input.category} not found`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId and fileName: ${error.message}`);
      throw new Error(`Failed to get file by userId and fileName: ${error.message}`);
    }
    return this.assetsHandlerS3Repository.getFileByUserIdAndFileName(input.category, input.userId, input.filename);
  }
}