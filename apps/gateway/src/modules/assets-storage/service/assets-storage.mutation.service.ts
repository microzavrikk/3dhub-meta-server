import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAssetInput, UpdateAssetInput, Asset } from '../../../utils/graphql/types/graphql';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class AssetsStorageService {
  private readonly logger = new Logger(AssetsStorageService.name);
  private readonly uploadPath = join(process.cwd(), 'assets-service');
  private readonly maxPayloadSize = 100 * 1024 * 1024; // 100MB

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
      price: data.price || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publicAccess: data.publicAccess ?? false,
    };

    try {
      const fileSize = file.size;
      if (fileSize > this.maxPayloadSize) {
        throw new Error(`File size ${(fileSize / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${this.maxPayloadSize / 1024 / 1024}MB`);
      }

      this.logger.log(`File size: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);

      // Save file to assets-service directory
      const filePath = join(this.uploadPath, file.filename);
      await fs.writeFile(filePath, file.buffer); // Write binary data directly

      const fileData = {
        originalname: file.originalname,
        filename: file.filename,
        mimetype: file.mimetype,
        size: fileSize,
        path: filePath,
        // Convert buffer to base64 for NATS transmission
        buffer: file.buffer.toString('base64')
      };    

      // Save fileData to txt file (optional, for debugging)
      const fileDataPath = join(this.uploadPath, 'fileData.txt');
      await fs.writeFile(fileDataPath, JSON.stringify({
        ...fileData,
        buffer: `<Buffer length: ${fileSize}>`  // Don't write the actual buffer to log
      }, null, 2));
      
      this.logger.log(`File data saved to: ${fileDataPath}`);

      console.log("Try to send file to NATS")
      await this.client.send({ cmd: 'upload-asset' }, { 
        newAsset,
        file: fileData 
      }).toPromise();
      console.log("File sent to NATS")
      
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