import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { Prisma, ThirdModel } from '@prisma/client';
import { CreateAssetDto, UpdateAssetDto } from './types';
@Injectable()
export class AssetsHandlerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAsset(data: CreateAssetDto): Promise<any> {
    return this.prisma.thirdModel.create({
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
  }

  async updateAsset(id: string, data: UpdateAssetDto): Promise<any> {
    return this.prisma.thirdModel.update({
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
  }

  async deleteAsset(id: string): Promise<any> {
    return this.prisma.thirdModel.delete({
      where: { id },
    });
  }

  async getAssetById(id: string): Promise<any | null> {
    return this.prisma.thirdModel.findUnique({
      where: { id },
    });
  }

  async getAssetsByUser(userId: string): Promise<any[]> {
    return this.prisma.thirdModel.findMany({
      where: { ownerId: userId },
    });
  }

  async getAssetsByCategory(category: string): Promise<any[]> {
    return this.prisma.thirdModel.findMany({
      where: { tags: { has: category } },
    });
  }
}