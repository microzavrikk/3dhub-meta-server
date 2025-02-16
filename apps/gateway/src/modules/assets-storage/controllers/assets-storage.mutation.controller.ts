import { Controller, Post, Delete, UseInterceptors, UploadedFiles, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AssetsStorageService } from '../service/assets-storage.mutation.service';
import { Logger } from '@nestjs/common';
import { CreateAssetDto } from '../dto/create-asset-input.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';
import { SessionGuard } from '../../session/decorators/session.guard';
import { AuthGuard } from '../../auth/decorator/auth.guard';

@Controller('assets-storage')
//@UseGuards(AuthGuard)
export class AssetsStorageMutationController {
  private readonly logger = new Logger(AssetsStorageMutationController.name);
  private readonly uploadPath = join(process.cwd(), 'uploads');

  constructor(private readonly assetsStorageService: AssetsStorageService) {
    this.initializeUploadDirectory();
  }

  private async initializeUploadDirectory() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true, mode: 0o777 });
      this.logger.log(`Upload directory created at: ${this.uploadPath}`);
      const stats = await fs.stat(this.uploadPath);
      this.logger.log(`Directory exists: ${stats.isDirectory()}`);
    } catch (error: any) {
      this.logger.error(`Failed to create upload directory: ${error.message}`);
    }
  }

  @Post('create-asset')
  //@UseGuards(SessionGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const uniqueFileName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${file.originalname}`;
          callback(null, uniqueFileName);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 10, // 10 MB per file
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateAssetDto })
  async createAsset(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createAssetDto: CreateAssetDto
  ) {
    try {
      // Add CORS headers
      const response = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };

      if (!files || files.length === 0) {
        throw new HttpException('At least one file is required', HttpStatus.BAD_REQUEST);
      }

      // Log total size of all files
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      this.logger.log(`Total size of uploaded files: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

      const results = await Promise.all(
        files.map(async (file) => {
          this.logger.log(`Uploading file ${file.originalname} - Size: ${file.size} bytes`);

          const fullFilePath = join(this.uploadPath, file.filename);
          const fileContent = await fs.readFile(fullFilePath);

          const fileDir = join(this.uploadPath, createAssetDto.category || 'default');
          await fs.mkdir(fileDir, { recursive: true });

          // Copy file to category directory
          const categoryFilePath = join(fileDir, file.filename);
          await fs.writeFile(categoryFilePath, fileContent);

          const fullFileObject = {
            ...file,
            buffer: fileContent,
            path: categoryFilePath  
          } as Express.Multer.File;

          const createAssetInput = {
            ...createAssetDto,
            fileName: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            filePath: categoryFilePath,
            publicAccess: createAssetDto.publicAccess || false,
            price: createAssetDto.price || 0,
          };

          this.logger.log("Create asset input: ", createAssetInput.size)

          try {
            const dataToSave = JSON.stringify(createAssetInput, null, 2);
            const dataFilePath = join(process.cwd(), 'data_file_now.txt');
            await fs.writeFile(dataFilePath, dataToSave);
            this.logger.log(`Successfully saved asset input data to data_file_now.txt`);
          } catch (err: any) {
            this.logger.error(`Failed to save asset input data to file: ${err.message}`);
          }

          // Log file size details
          this.logger.log(`File size details for ${file.originalname}:`);
          this.logger.log(`Raw size: ${file.size} bytes`);
          this.logger.log(`Size in KB: ${(file.size / 1024).toFixed(2)} KB`);
          this.logger.log(`Size in MB: ${(file.size / 1024 / 1024).toFixed(2)} MB`);

          this.logger.log("full file object: ", fullFileObject.buffer.length)

          const result = await this.assetsStorageService.createAsset(createAssetInput, fullFileObject);

          if (!result) {
            // Clean up both files if asset creation fails
            await Promise.all([
              fs.unlink(fullFilePath).catch((err) => {
                this.logger.error(`Failed to delete temp file after failed asset creation: ${err.message}`);
              }),
              fs.unlink(categoryFilePath).catch((err) => {
                this.logger.error(`Failed to delete category file after failed asset creation: ${err.message}`);
              })
            ]);
            
            return {
              success: false,
              fileName: file.originalname,
              fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
              error: 'Failed to create asset in the storage service'
            };
          }

          // Delete the temporary file after successful creation
          await fs.unlink(fullFilePath).catch((err) => {
            this.logger.error(`Failed to delete temp file after successful asset creation: ${err.message}`);
          });

          return {
            success: true,
            fileName: file.originalname,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            data: createAssetInput
          };
        })
      );

      const failedUploads = results.filter(result => !result.success);
      if (failedUploads.length > 0) {
        throw new HttpException(
          {
            message: 'Some files failed to upload',
            failedUploads
          },
          HttpStatus.PARTIAL_CONTENT
        );
      }

      return {
        message: 'Assets created successfully',
        success: true,
        totalSize: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
        data: results,
        ...response
      };

    } catch (error: any) {
      this.logger.error(`Failed to create assets: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to create assets: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/clear-all/:username')
  async clearAllAssets(@Param('username') username: string): Promise<boolean> {
    try {
      this.logger.log(`Attempting to clear all assets for user: ${username}`);
      const result = await this.assetsStorageService.deleteAllAssets(username);
      if (result) {
        this.logger.log(`Successfully cleared all assets for user: ${username}`);
        return true;
      } else {
        this.logger.warn(`Failed to clear all assets for user: ${username}`);
        return false;
      }
    } catch (error: any) {
      this.logger.error(`Error clearing assets for user ${username}: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to clear assets for user ${username}: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}