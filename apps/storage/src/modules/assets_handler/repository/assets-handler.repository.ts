import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../utils/prisma/prisma.service';
import { Prisma, ThirdModel } from '../../../utils/prisma/types';
import { CreateAssetDto, UpdateAssetDto } from '../types';
import { AssetOutput } from 'apps/gateway/src/utils/graphql/types/graphql';



@Injectable()
export class AssetsHandlerRepository {
  private readonly logger = new Logger(AssetsHandlerRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async searchModels(query: string): Promise<number> {
    return await this.prisma.thirdModel.count({ 
      where: {
        name: {
          contains: query
        }
      }
    });
  }

  async getAllFilesInDatabase(): Promise<AssetOutput[]> {
    const files = await this.prisma.thirdModel.findMany();
    return files.map(file => ({
        ...file,
        file: [file.fileKey],
        titleName: file.  name,
        category: file.category || 'default-category',
        fileSize: file.fileSize || 0,
        fileType: file.fileType || 'application/octet-stream',
        uploadDate: file.uploadDate || new Date(),
        publicAccess: file.publicAccess || false,
        thumbnailUrl: file.thumbnailUrl || null,
        metadata: file.metadata || null,
        updatedAt: file.updatedAt.toISOString()
    }));
  }
    
  async getAllFileNamesInDatabase(): Promise<string[]> {
    return await this.prisma.thirdModel.findMany({ select: { name: true } }).then(result => result.map(item => item.name));
  }

  async createAsset(data: CreateAssetDto): Promise<any> {
    try {
      const asset = await this.prisma.thirdModel.create({
        data: {
          name: data.newAsset.name,
          description: data.newAsset.description,
          category: data.newAsset.category,
          fileKey: data.newAsset.fileKey,
          bucketName: data.newAsset.bucketName || 'default-bucket-name', 
          fileSize: isNaN(parseInt(String(data.newAsset.fileSize))) ? 0 : parseInt(String(data.newAsset.fileSize)),
          fileType: data.newAsset.fileType || 'application/octet-stream',
          tags: Array.isArray(data.newAsset.tags) 
            ? data.newAsset.tags.filter((tag): tag is string => !!tag)
            : [data.newAsset.tags].filter((tag): tag is string => !!tag),
          ownerId: data.newAsset.ownerId || 'default-owner', 
          publicAccess: data.newAsset.publicAccess === 'true' 
            || data.newAsset.publicAccess === true 
            || false,
          thumbnailUrl: data.newAsset.thumbnailUrl,
          metadata: data.newAsset.metadata,
        },
      });
      this.logger.log(`Asset created successfully: ${asset.id}`);
      return asset;
    } catch (error: any) {
      this.logger.error(`Failed to create asset: ${error.message}`);
      throw error;
    }
  }

  async getAssetIdByFileName(fileName: string): Promise<any> {
    return (await this.prisma.thirdModel.findFirst({ where: { name: fileName }, select: { id: true } }))?.id;
    
  }

  async updateAsset(id: string, data: UpdateAssetDto): Promise<any> {
    try {
      const asset = await this.prisma.thirdModel.update({
        where: { id },
        data: {
          name: data.newAsset.name,
          description: data.newAsset.description,
          fileKey: data.newAsset.fileKey,
          bucketName: data.newAsset.bucketName || 'default-bucket-name', 
          fileSize: isNaN(parseInt(String(data.newAsset.fileSize))) ? 0 : parseInt(String(data.newAsset.fileSize)),
          fileType: data.newAsset.fileType || 'application/octet-stream',
          tags: Array.isArray(data.newAsset.tags) 
            ? data.newAsset.tags.filter((tag): tag is string => !!tag)
            : [data.newAsset.tags].filter((tag): tag is string => !!tag),
          ownerId: data.newAsset.ownerId || 'default-owner', 
          publicAccess: data.newAsset.publicAccess === 'true' 
            || data.newAsset.publicAccess === true 
            || false,
          thumbnailUrl: data.newAsset.thumbnailUrl,
          metadata: data.newAsset.metadata,
        },
      });
      this.logger.log(`Asset updated successfully: ${asset.id}`);
      return asset;
    } catch (error: any) {
      this.logger.error(`Failed to update asset: ${error.message}`);
      throw error;
    }
  }

  async deleteAsset(id: string): Promise<any> {
    try {
      const asset = await this.prisma.thirdModel.delete({
        where: { id },
      });
      this.logger.log(`Asset deleted successfully: ${asset.id}`);
      return asset;
    } catch (error: any) {
      this.logger.error(`Failed to delete asset: ${error.message}`);
      throw error;
    }
  }

  async getAssetById(id: string): Promise<any | null> {
    try {
      const asset = await this.prisma.thirdModel.findUnique({
        where: { id },
      });
      if (asset) {
        this.logger.log(`Asset retrieved successfully: ${asset.id}`);
      } else {
        this.logger.warn(`Asset not found: ${id}`);
      }
      return asset;
    } catch (error: any) {
      this.logger.error(`Failed to retrieve asset: ${error.message}`);
      throw error;
    }
  }

  async getAssetsByUser(userId: string): Promise<any[]> {
    try {
      const assets = await this.prisma.thirdModel.findMany({
        where: { ownerId: userId },
      });
      this.logger.log(`Assets retrieved successfully for user: ${userId}`);
      return assets;
    } catch (error: any) {
      this.logger.error(`Failed to retrieve assets for user: ${error.message}`);
      throw error;
    }
  }

  async getAssetsByCategory(category: string): Promise<any[]> {
    try {
      const assets = await this.prisma.thirdModel.findMany({
        where: { tags: { has: category } },
      });
      this.logger.log(`Assets retrieved successfully for category: ${category}`);
      return assets;
    } catch (error: any) {
      this.logger.error(`Failed to retrieve assets for category: ${error.message}`);
      throw error;
    }
  }
}