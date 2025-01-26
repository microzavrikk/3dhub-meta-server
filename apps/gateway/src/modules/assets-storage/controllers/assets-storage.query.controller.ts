import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AssetsStorageQueryService } from '../service/assets-storage.query.service';

@Controller('assets-storage')
export class AssetsStorageQueryController {
  private readonly logger = new Logger(AssetsStorageQueryController.name);

  constructor(private readonly assetsStorageQueryService: AssetsStorageQueryService) {}

  @Get('files/:category/:userId')
  async getFileByUserId(
    @Param('category') category: string,
    @Param('userId') userId: string
  ) {
    try {
      const file = await this.assetsStorageQueryService.getFileByUserId({ category, userId });
      return file;
    } catch (error: any) {
      this.logger.error(`Failed to get file: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get file: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('assets/user/:userId')
  async getAssetsByUser(@Param('userId') userId: string) {
    this.logger.log(`Getting assets by userId: ${userId}`);
    try {
      const assets = await this.assetsStorageQueryService.getAssetsByUser(userId);
      return assets;
    } catch (error: any) {
      this.logger.error(`Failed to get assets for user: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get assets for user: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('files/:category/:userId/:filename')
  async getFileByUserIdAndFileName(
    @Param('category') category: string,
    @Param('userId') userId: string,
    @Param('filename') filename: string
  ) {
    try {
      const file = await this.assetsStorageQueryService.getFileByUserIdAndFileName({ category, userId, filename });
      return file;
    } catch (error: any) {
      this.logger.error(`Failed to get file: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `Failed to get file: ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 