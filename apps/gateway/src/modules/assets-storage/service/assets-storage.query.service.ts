import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as AWS from 'aws-sdk';
import { GetFileByUserIdDto } from "../dto/assets-get-by-id.dto"
import { GetFileByUserIdAndFileNameDto } from "../dto/assets-get-by-filename.dto"
import { AssetInfo } from "../assets-storage.types"

@Injectable()
export class AssetsStorageQueryService {
  private readonly logger = new Logger(AssetsStorageQueryService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async getFileByUserId(input: GetFileByUserIdDto): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${input.userId} in category: ${input.category}`);

    try {
      const fileData = await this.client.send({ cmd: 'get-file-by-user-id' }, input).toPromise();
      return fileData;
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId: ${error.message}`);
      throw new Error(`Failed to get file by userId: ${error.message}`);
    }
  }

  async getAssetsByUser(userId: string): Promise<AssetInfo[]> {
    this.logger.log(`Getting assets by userId: ${userId}`);
    try {
      const assets = await this.client.send({ cmd: 'get-assets-by-user' }, userId).toPromise();
      
      const assetInfos: AssetInfo[] = assets.map((asset: any) => ({
        titleName: asset.titleName || '',
        name: asset.name || '',
        tags: asset.tags || [],
        category: asset.category || '',
        createdAt: asset.createdAt || new Date().toISOString(),
        downloadUrl: asset.downloadUrl || []
      }));

      return assetInfos;
    } catch (error: any) {
      this.logger.error(`Failed to get assets by userId: ${error.message}`);
      throw new Error(`Failed to get assets by userId: ${error.message}`);
    }
  }

  async getFileByUserIdAndFileName(input: GetFileByUserIdAndFileNameDto): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${input.userId}, fileName: ${input.filename} in category: ${input.category}`);

    try {
      const fileData = await this.client.send({ cmd: 'get-file-by-user-id-and-file-name' }, input).toPromise();
      return fileData;
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId and fileName: ${error.message}`);
      throw new Error(`Failed to get file by userId and fileName: ${error.message}`);
    }
  }
}