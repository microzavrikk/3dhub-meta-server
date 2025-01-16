import { Injectable, Logger } from '@nestjs/common';
import { AssetsHandlerS3Repository } from './assets-handler.s3.repository';

@Injectable()
export class AssetsHandlerS3Service {
  private readonly logger = new Logger(AssetsHandlerS3Service.name);

  constructor(
    private readonly assetsHandlerS3Repository: AssetsHandlerS3Repository
  ) {}

  async checkFileKeyExists(fileKey: string): Promise<boolean> {
    try {
      this.logger.log(`Checking if file exists with key: ${fileKey}`);
      const exists = await this.assetsHandlerS3Repository.checkFileExists(fileKey);
      
      if (exists) {
        this.logger.log(`File with key ${fileKey} exists in S3`);
      } else {
        this.logger.log(`File with key ${fileKey} does not exist in S3`);
      }

      return exists;
    } catch (error: any) {
      this.logger.error(`Error checking file existence: ${error.message}`);
      throw new Error(`Failed to check file existence: ${error.message}`);
    }
  }
}
