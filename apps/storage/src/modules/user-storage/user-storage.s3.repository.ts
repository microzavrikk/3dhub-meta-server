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

    const fileKey = `avatars/${username}/avatar${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
    
    this.logger.log(`File size: ${file.size} bytes`);
    this.logger.log(`Uploading avatar for user ${username}: ${fileKey}`);

    try {
      const listParams = {
        Bucket: this.bucketName,
        Prefix: `avatars/${username}/`,
      };
      const existingFiles = await this.s3.listObjectsV2(listParams).promise();
      
      if (existingFiles.Contents && existingFiles.Contents.length > 0) {
        await Promise.all(existingFiles.Contents.map(file => {
          return this.s3.deleteObject({
            Bucket: this.bucketName,
            Key: file.Key!
          }).promise();
        }));
        this.logger.log(`Deleted existing avatar for user ${username}`);
      }
    } catch (error: any) {
      this.logger.warn(`Failed to delete existing avatar: ${error.message}`);
    }
    
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

  async getAvatar(username: string): Promise<string> {
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

      const signedUrl = await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucketName,
        Key: latestAvatar.Key,
        Expires: 3600
      });

      this.logger.log(`Avatar URL: ${signedUrl}`);

      return signedUrl;
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
