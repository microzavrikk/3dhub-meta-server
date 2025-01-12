import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAssetInput, UpdateAssetInput, Asset } from '../../../utils/graphql/types/graphql';

@Injectable()
export class AssetsStorageService {
  private readonly logger = new Logger(AssetsStorageService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async createAsset(data: CreateAssetInput): Promise<boolean> {
    this.logger.log(`Creating asset: ${JSON.stringify(data)}`);
    const newAsset: Asset = {
      id: this.generateId(),
      ...data,
      uploadDate: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicAccess: data.publicAccess ?? false,
    };

    try {
      await this.client.send({ cmd: 'upload-asset' }, newAsset).toPromise();
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to create asset: ${error.message}`);
      return false;
    }
  }

  async updateAsset(data: UpdateAssetInput): Promise<boolean> {
    this.logger.log(`Updating asset: ${JSON.stringify(data)}`);

    try {
      await this.client.send({ cmd: 'update-asset' }, data).toPromise();
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to update asset: ${error.message}`);
      return false;
    }
  }

  async deleteAsset(assetId: string): Promise<boolean> {
    this.logger.log(`Deleting asset: ${assetId}`);

    try {
      await this.client.send({ cmd: 'delete-asset' }, assetId).toPromise();
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to delete asset: ${error.message}`);
      return false;
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}