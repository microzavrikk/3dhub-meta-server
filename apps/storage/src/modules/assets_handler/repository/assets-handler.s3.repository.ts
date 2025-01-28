import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { CreateAssetDto } from '../types';
import { AssetInfo } from 'apps/gateway/src/modules/assets-storage/assets-storage.types';

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
      signatureVersion: 'v4'
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || 'default-bucket-name';    
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

  async deleteAllAssets(username: string): Promise<boolean> {
    this.logger.log(`Deleting all assets for user: ${username}`);
    try {
      const categoriesParams = {
        Bucket: this.bucketName,
        Delimiter: '/'
      };
      
      const categories = await this.s3.listObjectsV2(categoriesParams).promise();
      
      if (!categories.CommonPrefixes?.length) {
        this.logger.log('No categories found');
        return true;
      }

      for (const prefix of categories.CommonPrefixes) {
        if (!prefix.Prefix) continue;
        
        if (prefix.Prefix.startsWith('banners/') || prefix.Prefix.startsWith('avatars/')) {
          this.logger.log(`Skipping protected category: ${prefix.Prefix}`);
          continue;
        }

        const listParams = {
          Bucket: this.bucketName,
          Prefix: `${prefix.Prefix}${username}/`
        };

        const objects = await this.s3.listObjectsV2(listParams).promise();
        
        if (!objects.Contents?.length) continue;

        const deleteParams = {
          Bucket: this.bucketName,
          Delete: {
            Objects: objects.Contents
              .filter(obj => obj.Key)
              .map(({ Key }) => ({ Key: Key! }))
          }
        };

        await this.s3.deleteObjects(deleteParams).promise();
        this.logger.log(`Deleted assets for user ${username} in category ${prefix.Prefix}`);
      }

      return true;
    } catch (error: any) {
      this.logger.error(`Failed to delete assets for user ${username}: ${error.message}`);
      throw error;
    }
  }

  async uploadFile(data: CreateAssetDto, fileKey?: string, file?: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    if (!fileKey) {
      throw new Error('FileKey is required');
    }
    const fileExists = await this.checkFileExists(fileKey);
    if (fileExists) {
      this.logger.warn(`File with key ${fileKey} already exists in S3`);
      throw new Error(`File with key ${fileKey} already exists`);
    }
    
    this.logger.log(`Uploading file: ${fileKey}, ${data.file.buffer.length} bytes`);

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: data.file.buffer,
      ContentType: `${data.file.mimetype}; charset=utf-8`,
      ContentDisposition: 'inline'
    };

    try {
      const data = await this.s3.upload(uploadParams).promise();
      this.logger.log(`File uploaded successfully. ${data.Location}`);
      return data;
    } catch (error: any) {
      this.logger.error(`Failed to upload file. ${error.message}`);
      throw new Error(`Failed to upload file. ${error.message}`);
    }
  }

  async getAssetsByUser(username: string): Promise<AssetInfo[]> {
    const params = {
      Bucket: this.bucketName,
      Prefix: '',
    };

    this.logger.log(`Getting assets by userId: ${username}`);

    try {
      const allObjects = await this.s3.listObjectsV2(params).promise();
      
      if (!allObjects.Contents) {
        this.logger.log(`No objects found for user: ${username}`);
        return [];
      }

      const userAssets = allObjects.Contents.filter(object => {
        const key = object.Key || '';
        const pathParts = key.split('/');
        return pathParts.length >= 2 && pathParts[1] === username;
      });

      this.logger.log(`Found ${userAssets.length} assets for user: ${username}`);
      
      this.logger.log(userAssets);

      const assets = await Promise.all(userAssets.map(async asset => {
        const fileData = await this.s3.getObject({
          Bucket: this.bucketName,
          Key: asset.Key || ''
        }).promise();

        const previewUrl = this.s3.getSignedUrl('getObject', {
          Bucket: this.bucketName,
          Key: asset.Key || '',
          Expires: 3600, 
          ResponseContentDisposition: 'inline'
        });

        return {
          titleName: asset.Key?.split('/')[asset.Key?.split('/').length - 2] || '',
          name: asset.Key?.split('/').pop() || '',
          tags: [], 
          category: asset.Key?.split('/')[0] || '',
          createdAt: asset.LastModified?.toISOString() || '',
          downloadUrl: [this.s3.getSignedUrl('getObject', {
            Bucket: this.bucketName,
            Key: asset.Key || '',
            Expires: 3600,
            ResponseContentDisposition: 'attachment'
          })],
          previewUrl: previewUrl 
        };
      }));

      return assets;

    } catch (error: any) {
      this.logger.error(`Failed to get assets for user ${username}: ${error.message}`);
      throw new Error(`Failed to get assets for user: ${error.message}`);
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
          ResponseContentDisposition: 'inline'
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
      ResponseContentDisposition: 'inline'
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