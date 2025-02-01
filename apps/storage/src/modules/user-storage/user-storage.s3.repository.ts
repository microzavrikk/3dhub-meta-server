import { Injectable, Logger, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserStorageS3Repository {
  private readonly logger = new Logger(UserStorageS3Repository.name);
  private readonly s3: AWS.S3;
  private readonly bucketName: string;
  private readonly urlExpirationTime: number = Number.MAX_SAFE_INTEGER;

  constructor(
    private readonly configService: ConfigService,
    @Inject('PROFILE_SERVICE') private readonly rpcService: ClientProxy
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_S3_REGION'),
      signatureVersion: 'v4'
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || 'default-bucket-name';

    // Configure CORS for the S3 bucket
    const corsParams = {
      Bucket: this.bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: ['ETag']
          }
        ]
      }
    };

    this.s3.putBucketCors(corsParams, (err) => {
      if (err) {
        this.logger.error(`Failed to set CORS policy: ${err.message}`);
      } else {
        this.logger.log('CORS policy set successfully');
      }
    });
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
      const publicUrl = `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_S3_REGION')}.amazonaws.com/${fileKey}`;
      this.logger.log(`Avatar uploaded successfully for user ${username}. Public URL: ${publicUrl}`);
      
      this.rpcService.emit('profile-set-avatar', { userId: username, avatarUrl: publicUrl });
      
      return {
        ...data,
        Location: publicUrl 
      };
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
        Expires: this.urlExpirationTime
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

  async uploadBanner(username: string, file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    if (!file.buffer || !file.size) {
      throw new Error('Invalid file: File buffer or size is missing');
    }

    const fileKey = `banners/${username}/banner${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
    
    this.logger.log(`File size: ${file.size} bytes`);
    this.logger.log(`Uploading banner for user ${username}: ${fileKey}`);

    try {
      const listParams = {
        Bucket: this.bucketName,
        Prefix: `banners/${username}/`,
      };
      const existingFiles = await this.s3.listObjectsV2(listParams).promise();
      
      if (existingFiles.Contents && existingFiles.Contents.length > 0) {
        await Promise.all(existingFiles.Contents.map(file => {
          return this.s3.deleteObject({
            Bucket: this.bucketName,
            Key: file.Key!
          }).promise();
        }));
        this.logger.log(`Deleted existing banner for user ${username}`);
      }
    } catch (error: any) {
      this.logger.warn(`Failed to delete existing banner: ${error.message}`);
    }
    
    const params = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: Buffer.from(file.buffer),
      ContentType: file.mimetype
    };

    try {
      const data = await this.s3.upload(params).promise();
      const publicUrl = `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_S3_REGION')}.amazonaws.com/${fileKey}`;
      this.logger.log(`Banner uploaded successfully for user ${username}. Public URL: ${publicUrl}`);
      
      this.rpcService.emit('profile-set-background', { userId: username, backgroundUrl: publicUrl });

      
      
      return {
        ...data,
        Location: publicUrl 
      };
    } catch (error: any) {
      this.logger.error(`Failed to upload banner for user ${username}. ${error.message}`);
      throw new Error(`Failed to upload banner. ${error.message}`);
    }
  }

  async getBanner(username: string): Promise<string> {
    const listParams = {
      Bucket: this.bucketName,
      Prefix: `banners/${username}/`,
      MaxKeys: 1
    };

    try {
      const listResult = await this.s3.listObjectsV2(listParams).promise();
      
      if (!listResult.Contents || listResult.Contents.length === 0) {
        throw new Error('No banner found');
      }

      const latestBanner = listResult.Contents[0];
      
      if (!latestBanner.Key) {
        throw new Error('Invalid banner key');
      }

      const signedUrl = await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucketName,
        Key: latestBanner.Key,
        Expires: this.urlExpirationTime
      });

      this.logger.log(`Banner URL: ${signedUrl}`);

      return signedUrl;
    } catch (error: any) {
      this.logger.error(`Failed to get banner for user ${username}. ${error.message}`);
      throw new Error(`Failed to get banner. ${error.message}`);
    }
  }
}
