import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { AssetsHandlerRepository } from './assets-handler.repository';
import { AssetsHandlerS3Repository } from './assets-handler.s3.repository';
import { CreateAssetDto, UpdateAssetDto, Asset } from './types';
import * as AWS from 'aws-sdk';
import { GetFileByUserIdDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-id.dto';
import { GetFileByUserIdAndFileNameDto } from '../../../../gateway/src/modules/assets-storage/dto/assets-get-by-filename.dto';

@Injectable()
export class AssetsHandlerService {
  private readonly logger = new Logger(AssetsHandlerService.name);

  constructor(
    private readonly assetsHandlerRepository: AssetsHandlerRepository,
    private readonly assetsHandlerS3Repository: AssetsHandlerS3Repository,
    private readonly configService: ConfigService,
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async createAsset(data: CreateAssetDto, file: Express.Multer.File): Promise<Asset> {    
    // Проверяем, что все ключевые свойства присутствуют
    this.logger.log(`Creating asset: ${data.newAsset.name}, ${data.newAsset.category}, ${data.newAsset.ownerId}`);
    if (!data.newAsset.category || !data.newAsset.ownerId || !data.newAsset.name) {
        throw new Error(`Missing required fields for fileKey generation. Received data:`);
    }

    // Генерация ключа файла
    const fileKey = `${data.newAsset.category}/${data.newAsset.ownerId}/${data.newAsset.name}`;
    this.logger.log(`Generated fileKey: ${fileKey}`);

    // Загрузка файла в хранилище
    await this.assetsHandlerS3Repository.uploadFile(data, fileKey, file);

    // Добавление ключа файла к данным
    const assetData = { ...data, fileKey };

    // Сохранение данных в репозитории
    const asset = await this.assetsHandlerRepository.createAsset(assetData);
    return asset;
}


  //async updateAsset(id: string, data: UpdateAssetDto): Promise<Asset> {
  //  this.logger.log(`Updating asset: ${JSON.stringify(data)}`);
//
  //  if (data.file) {
   //   const fileKey = `${data.ownerId}/${data.name}`;
    //  await this.assetsHandlerS3Repository.uploadFile(data);
   //   data.fileKey = fileKey;
   // }

   // const asset = await this.assetsHandlerRepository.updateAsset(id, data);

  //  return asset;
  //}

  async deleteAsset(id: string): Promise<void> {
    this.logger.log(`Deleting asset: ${id}`);

    const asset = await this.assetsHandlerRepository.getAssetById(id);
    if (!asset) {
      throw new Error(`Asset with id ${id} not found`);
    }

    await this.assetsHandlerS3Repository.deleteFile(asset.fileKey);

    await this.assetsHandlerRepository.deleteAsset(id);
  }

  async getFileByUserId(input: GetFileByUserIdDto): Promise<AWS.S3.GetObjectOutput> {
    try {
      const categories = await this.client.send({ cmd: 'get-categories' }, {}).toPromise();
      if (!categories.includes(input.category)) {
        throw new Error(`Category ${input.category} not found`);
      } else {
      }
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId: ${error.message}`);
      throw new Error(`Failed to get file by userId: ${error.message}`);
    }
    return this.assetsHandlerS3Repository.getFileByUserId(input.category, input.userId);
  }

  async getFileByUserIdAndFileName(input: GetFileByUserIdAndFileNameDto): Promise<AWS.S3.GetObjectOutput> {
    this.logger.log(`Getting file by userId: ${input.userId}, fileName: ${input.filename} in category: ${input.category}`);
    try {
      const categories = await this.client.send({ cmd: 'get-categories' }, {}).toPromise();
      if (!categories.includes(input.category)) {
        throw new Error(`Category ${input.category} not found`);
      }
    } catch (error: any) {
      this.logger.error(`Failed to get file by userId and fileName: ${error.message}`);
      throw new Error(`Failed to get file by userId and fileName: ${error.message}`);
    }
    return this.assetsHandlerS3Repository.getFileByUserIdAndFileName(input.category, input.userId, input.filename);
  }
}