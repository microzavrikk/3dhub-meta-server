import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { Prisma, ThirdModel } from '@prisma/client';
import { CreateAssetDto, UpdateAssetDto } from './types';

@Injectable()
export class AssetsHandlerRepository {
  private readonly logger = new Logger(AssetsHandlerRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async createAsset(data: CreateAssetDto): Promise<any> {
    try {
      const asset = await this.prisma.thirdModel.create({
        data: {
          name: data.name,
          description: data.description,
          fileKey: data.fileKey,
          bucketName: data.bucketName,
          fileSize: data.fileSize,
          fileType: data.fileType,
          tags: data.tags,
          ownerId: data.ownerId,
          publicAccess: data.publicAccess ?? false,
          thumbnailUrl: data.thumbnailUrl,
          metadata: data.metadata,
        },
      });
      this.logger.log(`Asset created successfully: ${asset.id}`);
      return asset;
    } catch (error: any) {
      this.logger.error(`Failed to create asset: ${error.message}`);
      throw error;
    }
  }

  async updateAsset(id: string, data: UpdateAssetDto): Promise<any> {
    try {
      const asset = await this.prisma.thirdModel.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          fileKey: data.fileKey,
          bucketName: data.bucketName,
          fileSize: data.fileSize,
          fileType: data.fileType,
          tags: data.tags,
          ownerId: data.ownerId,
          publicAccess: data.publicAccess,
          thumbnailUrl: data.thumbnailUrl,
          metadata: data.metadata,
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