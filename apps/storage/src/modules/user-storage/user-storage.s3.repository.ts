import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserStorageS3Repository {
  private readonly logger = new Logger(UserStorageS3Repository.name);
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

  async uploadAvatar(username: string, file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    if (!file.buffer || !file.size) {
      throw new Error('Invalid file: File buffer or size is missing');
    }

    const fileKey = `avatars/${username}/${Date.now()}-${file.originalname}`;
    
    this.logger.log(`File size: ${file.size} bytes`);
    this.logger.log(`Uploading avatar for user ${username}: ${fileKey}`);
    
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: Buffer.from(file.buffer), 
      ContentType: file.mimetype
    };

    try {
      const data = await this.s3.upload(params).promise();
      this.logger.log(`Avatar uploaded successfully for user ${username}. ${data.Location}`);
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to upload avatar for user ${username}. ${error.message}`);
      throw new Error(`Failed to upload avatar. ${error.message}`);
    }
  }

  async getAvatar(username: string): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting avatar for user ${username}`);
    
    const listParams = {
      Bucket: this.bucketName,
      Prefix: `avatars/${username}/`,
      MaxKeys: 1
    };

    try {
      const listResult = await this.s3.listObjectsV2(listParams).promise();
      
      if (!listResult.Contents || listResult.Contents.length === 0) {
        throw new Error('No avatar found');
      }

      const latestAvatar = listResult.Contents[0];
      
      if (!latestAvatar.Key) {
        throw new Error('Invalid avatar key');
      }

      const getParams = {
        Bucket: this.bucketName,
        Key: latestAvatar.Key,
      };

      const data = await this.s3.getObject(getParams).promise();
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to get avatar for user ${username}. ${error.message}`);
      throw new Error(`Failed to get avatar. ${error.message}`);
    }
  }

  async deleteAvatar(fileKey: string): Promise<void> {
    this.logger.log(`Deleting avatar: ${fileKey}`);
    
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    try {
      await this.s3.deleteObject(params).promise();
      this.logger.log(`Avatar deleted successfully: ${fileKey}`);
    } catch (error: any) {
      this.logger.error(`Failed to delete avatar. ${error.message}`);
      throw new Error(`Failed to delete avatar. ${error.message}`);
    }
  }
}
