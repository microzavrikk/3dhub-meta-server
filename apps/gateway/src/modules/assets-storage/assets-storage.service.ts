import { Injectable, Logger } from '@nestjs/common';
import { CreateAssetInput, UpdateAssetInput, Asset } from '../../utils/graphql/types/graphql';

@Injectable()
export class AssetsStorageService {
  private readonly logger = new Logger(AssetsStorageService.name);

  private assets: Asset[] = [];

  async createAsset(data: CreateAssetInput): Promise<boolean> {
    this.logger.log(`Creating asset: ${JSON.stringify(data)}`);
    const newAsset: Asset = {
      id: this.generateId(),
      ...data,
      uploadDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicAccess: data.publicAccess ?? false,
    };
    this.assets.push(newAsset);
    return true;
  }

  async updateAsset(data: UpdateAssetInput): Promise<boolean> {
    this.logger.log(`Updating asset: ${JSON.stringify(data)}`);
    const index = this.assets.findIndex(asset => asset.id === data.id);
    if (index === -1) {
      return false;
    }
    this.assets[index] = {
      ...this.assets[index],
      name: data.name ?? this.assets[index].name,
      description: data.description ?? this.assets[index].description,
      fileKey: data.fileKey ?? this.assets[index].fileKey,
      bucketName: data.bucketName ?? this.assets[index].bucketName,
      fileSize: data.fileSize ?? this.assets[index].fileSize,
      fileType: data.fileType ?? this.assets[index].fileType,
      tags: data.tags ?? this.assets[index].tags,
      ownerId: data.ownerId ?? this.assets[index].ownerId,
      publicAccess: data.publicAccess ?? this.assets[index].publicAccess,
      thumbnailUrl: data.thumbnailUrl ?? this.assets[index].thumbnailUrl,
      metadata: data.metadata ?? this.assets[index].metadata,
      updatedAt: new Date().toISOString(),
    };
    return true;
  }

  async deleteAsset(assetId: string): Promise<boolean> {
    this.logger.log(`Deleting asset: ${assetId}`);
    const index = this.assets.findIndex(asset => asset.id === assetId);
    if (index === -1) {
      return false;
    }
    this.assets.splice(index, 1);
    return true;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}