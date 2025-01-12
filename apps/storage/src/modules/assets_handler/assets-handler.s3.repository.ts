import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AssetsHandlerS3Repository {
  private readonly logger = new Logger(AssetsHandlerS3Repository.name);
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_S3_REGION'),
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || 'default-bucket-name';
  }

  async uploadFile(file: Express.Multer.File, fileKey: string): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.s3.upload(params).promise();
      this.logger.log(`File uploaded successfully. ${data.Location}`);
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to upload file. ${error.message}`);
      throw new Error(`Failed to upload file. ${error.message}`);
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    try {
      await this.s3.deleteObject(params).promise();
      this.logger.log(`File deleted successfully. ${fileKey}`);
    } catch (error: any) {
      this.logger.error(`Failed to delete file. ${error.message}`);
      throw new Error(`Failed to delete file. ${error.message}`);
    }
  }
}