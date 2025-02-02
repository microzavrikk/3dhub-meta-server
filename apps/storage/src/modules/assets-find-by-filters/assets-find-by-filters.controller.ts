import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AssetsHandlerService } from '../assets_handler/service/assets-handler.service';
import { AssetsFindByFiltersService } from './assets-find-by-filters.service';

@Controller()
export class AssetsFindByFiltersController {
  private readonly logger = new Logger(AssetsFindByFiltersController.name);

  constructor(
    private readonly assetsFindByFiltersService: AssetsFindByFiltersService
  ) {}

  @MessagePattern({ cmd: 'get-default-filters' })
  async getDefaultFilters() {
    try {
      this.logger.log('Getting default filters');
      return await this.assetsFindByFiltersService.getDefaultFilters();
    } catch (error: any) {
      this.logger.error(`Failed to get default filters: ${error.message}`);
      throw error;
    }
  }
}
