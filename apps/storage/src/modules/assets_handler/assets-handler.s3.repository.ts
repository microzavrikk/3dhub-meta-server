import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { CreateAssetDto } from './types';

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

  async uploadFile(data: CreateAssetDto, fileKey?: string, file?: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    this.logger.log(`Uploading file: ${fileKey}, ${data.file.buffer} bytes`);
    if (!fileKey) {
      throw new Error('FileKey is required');
    }
    const fileExists = await this.checkFileExists(fileKey);
    if (fileExists) {
      this.logger.warn(`File with key ${fileKey} already exists in S3`);
      throw new Error(`File with key ${fileKey} already exists`);
    }
    
    this.logger.log(`Uploading file: ${fileKey}, ${data.file.buffer} bytes`);
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: data.file.buffer,
      ContentType: data.file.mimetype,
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

  async checkFileExists(fileKey: string): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: fileKey
    };

    try {
      await this.s3.headObject(params).promise();
      this.logger.log(`File exists: ${fileKey}`);
      return true;
    } catch (error: any) {
      if (error.code === 'NotFound') {
        this.logger.log(`File does not exist: ${fileKey}`);
        return false;
      }
      this.logger.error(`Error checking file existence: ${error.message}`);
      throw new Error(`Failed to check file existence: ${error.message}`);
    }
  }

  async getFileByUserId(category: string, userId: string): Promise<AWS.S3.GetObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Prefix: `${category}/${userId}/`,
    };
  
    try {
      const data = await this.s3.listObjectsV2(params).promise();
      if (data.Contents && data.Contents.length > 0) {
        const fileParams = {
          Bucket: this.bucketName,
          Key: data.Contents[0].Key!,
        };
        const fileData = await this.s3.getObject(fileParams).promise();
        this.logger.log(`File retrieved successfully for user: ${userId}`);
        return fileData;
      } else {
        throw new Error(`No files found for user: ${userId}`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to retrieve file for user: ${error.message}`);
      throw new Error(`Failed to retrieve file for user: ${error.message}`);
    }
  }

  async getFileByUserIdAndFileName(category: string, userId: string, fileName: string): Promise<AWS.S3.GetObjectOutput> {
    const fileKey = `${category}/${userId}/${fileName}`;
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };
  
    try {
      const data = await this.s3.getObject(params).promise();
      this.logger.log(`File retrieved successfully: ${fileKey}`);
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to retrieve file: ${error.message}`);
      throw new Error(`Failed to retrieve file: ${error.message}`);
    }
  }

  async getAllCategoryInS3(): Promise<string[]> {
    const params = {
      Bucket: this.bucketName,
      Delimiter: '/'
    };
    try {
      const data = await this.s3.listObjectsV2(params).promise();
      const categories = data.CommonPrefixes?.map(prefix => prefix.Prefix?.slice(0, -1) || '') || [];
      this.logger.log(`Retrieved ${categories.length} categories`);
      return categories;
    } catch (error: any) {
      this.logger.error(`Failed to retrieve categories: ${error.message}`);
      throw new Error(`Failed to retrieve categories: ${error.message}`);
    }
  }
}