import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAssetInput, UpdateAssetInput, Asset } from '../../../utils/graphql/types/graphql';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class AssetsStorageService {
  private readonly logger = new Logger(AssetsStorageService.name);
  private readonly uploadPath = join(process.cwd(), 'assets-service');

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {
    this.initializeUploadDirectory();
  }

  private async initializeUploadDirectory() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true, mode: 0o777 });
      this.logger.log(`Upload directory created at: ${this.uploadPath}`);
    } catch (error: any) {
      this.logger.error(`Failed to create upload directory: ${error.message}`);
    }
  }

  async deleteAllAssets(username: string): Promise<boolean> {
    try {
      const result = await this.client.send({ cmd: 'delete-all-assets' }, { username }).toPromise();
      if (result) {
        this.logger.log('Successfully cleared all assets');
        return true;
      } else {
        this.logger.warn('Failed to clear all assets');
        return false;
      }
    } catch (error: any) {
      this.logger.error(`Failed to clear all assets: ${error.message}`);
      return false;
    }
  }

  async createAsset(data: CreateAssetInput, file: Express.Multer.File): Promise<boolean> {
    const newAsset: Asset = {
      id: this.generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicAccess: data.publicAccess ?? false,
    };

    try {
      // Save file to assets-service directory
      const filePath = join(this.uploadPath, file.filename);
      const fileContent = file.buffer.toString('utf8');
      await fs.writeFile(filePath, fileContent, 'utf8');

      const fileData = {
        originalname: file.originalname,
        filename: file.filename,
        mimetype: `${file.mimetype}; charset=utf-8`,
        size: file.size,
        path: filePath,
        buffer: fileContent
      };    

      // Save fileData to txt file
      const fileDataPath = join(this.uploadPath, 'fileData.txt');
      await fs.writeFile(fileDataPath, JSON.stringify(fileData, null, 2), 'utf8');
      this.logger.log(`File data saved to: ${fileDataPath}`);
  
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