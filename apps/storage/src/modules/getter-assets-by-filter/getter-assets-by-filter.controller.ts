import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssetsFilterInput, AssetsFilterOutput } from 'apps/gateway/src/utils/graphql/types/graphql';
import { GetterAssetsByFilterService } from './getter-assets-by-filter.service';

@Controller()
export class GetterAssetsByFilterController {
  private readonly logger = new Logger(GetterAssetsByFilterController.name);

  constructor(
    private readonly getterAssetsByFilterService: GetterAssetsByFilterService
  ) {}

  @MessagePattern({ cmd: 'find-assets-by-filter' })
  async findAssetsByFilter(input: AssetsFilterInput): Promise<AssetsFilterOutput> {
    try {
      this.logger.log('Finding assets by filter');
      return await this.getterAssetsByFilterService.findAssetsByFilter(input);
    } catch (error: any) {
      this.logger.error(`Failed to find assets by filter: ${error.message}`);
      throw error;
    }
  }
}

