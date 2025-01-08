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
      ...data,
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

  async getAssetById(assetId: string): Promise<Asset | null> {
    this.logger.log(`Getting asset by ID: ${assetId}`);
    return this.assets.find(asset => asset.id === assetId) || null;
  }

  async getAssetsByUser(userId: string): Promise<Asset[]> {
    this.logger.log(`Getting assets by user ID: ${userId}`);
    return this.assets.filter(asset => asset.ownerId === userId);
  }

  async getAssetsByCategory(category: string): Promise<Asset[]> {
    this.logger.log(`Getting assets by category: ${category}`);
    return this.assets.filter(asset => asset.tags.includes(category));
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}