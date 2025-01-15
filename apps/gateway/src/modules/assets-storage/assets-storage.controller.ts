import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsStorageService } from './service/assets-storage.mutation.service';
import { Logger } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset-input.dto';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as crypto from 'crypto';
import { diskStorage } from 'multer';

@Controller('assets-storage')
export class AssetsStorageController {
  private readonly logger = new Logger(AssetsStorageController.name);
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
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = join(process.cwd(), 'uploads');
        console.log('Saving to:', uploadPath);
        cb(null, uploadPath);
      },
      filename: (req, file, callback) => {
        const uniqueFileName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}-${file.originalname}`;
        console.log('Generated filename:', uniqueFileName);
        callback(null, uniqueFileName);
      },
    }),
    limits: {
      fileSize: 1024 * 1024 * 10, // 10 MB
    },
  }),
)
@ApiConsumes('multipart/form-data')
@ApiBody({ type: CreateAssetDto })
async createAsset(
  @UploadedFile() file: Express.Multer.File,
  @Body() createAssetDto: CreateAssetDto
) {
  try {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    this.logger.log('File upload attempt detected');
    this.logger.log(`Upload path: ${this.uploadPath}`);

    const fullFilePath = join(this.uploadPath, file.filename);

    // Read the entire file content from disk
    const fileContent = await fs.readFile(fullFilePath);

    const fullFileObject = {
      ...file,
      buffer: fileContent,
    };

    this.logger.log('Complete file object for storage:', {
      originalname: fullFileObject.originalname,
      filename: fullFileObject.filename,
      mimetype: fullFileObject.mimetype,
      size: fullFileObject.size,
      path: fullFileObject.path,
      hasBuffer: !!fullFileObject.buffer,
    });

    const createAssetInput = {
      ...createAssetDto,
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filePath: file.path,
      publicAccess: createAssetDto.publicAccess || false,
    };

    const result = await this.assetsStorageService.createAsset(createAssetInput, fullFileObject);

    if (!result) {
      // Cleanup: delete the file if asset creation fails
      await fs.unlink(fullFilePath).catch((err) => {
        this.logger.error(`Failed to delete file after failed asset creation: ${err.message}`);
      });

      throw new HttpException(
        'Failed to create asset in the storage service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      message: 'Asset created successfully',
      success: true,
      data: createAssetInput,
    };
  } catch (error: any) {
    this.logger.error(`Failed to create asset: ${error.message}`);
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: `Failed to create asset: ${error.message}`,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
}