import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as AWS from 'aws-sdk';
import { GetFileByUserIdDto } from "../dto/assets-get-by-id.dto"
import { GetFileByUserIdAndFileNameDto } from "../dto/assets-get-by-filename.dto"

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