import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAssetInput, UpdateAssetInput, Asset } from '../../../utils/graphql/types/graphql';

@Injectable()
export class AssetsStorageService {
  private readonly logger = new Logger(AssetsStorageService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async createAsset(data: CreateAssetInput, file: Express.Multer.File): Promise<boolean> {
    const newAsset: Asset = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicAccess: data.publicAccess ?? false,
    };
  
    const fileData = {
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      buffer: file.buffer ? file.buffer.toString('base64') : undefined
    };    
  
    try {
      await this.client.send({ cmd: 'upload-asset' }, { 
        newAsset, 
        file: fileData 
      }).toPromise();
      return true;
    } catch (error: any) {
      this.logger.error(`Failed to create asset: ${error.message}`);
      return false;
    }
}

  async updateAsset(data: UpdateAssetInput): Promise<boolean> {
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