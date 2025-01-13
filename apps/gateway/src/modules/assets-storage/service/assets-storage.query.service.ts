import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as AWS from 'aws-sdk';

@Injectable()
export class AssetsStorageQueryService {
  private readonly logger = new Logger(AssetsStorageQueryService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async getFileByUserId(category: string, userId: string): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${userId} in category: ${category}`);

    try {
      const fileData = await this.client.send({ cmd: 'get-file-by-user-id' }, { category, userId }).toPromise();
      return fileData;
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId: ${error.message}`);
      throw new Error(`Failed to get file by userId: ${error.message}`);
    }
  }

  async getFileByUserIdAndFileName(category: string, userId: string, fileName: string): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${userId}, fileName: ${fileName} in category: ${category}`);

    try {
      const fileData = await this.client.send({ cmd: 'get-file-by-user-id-and-file-name' }, { category, userId, fileName }).toPromise();
      return fileData;
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId and fileName: ${error.message}`);
      throw new Error(`Failed to get file by userId and fileName: ${error.message}`);
    }
  }
}