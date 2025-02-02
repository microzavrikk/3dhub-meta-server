import { Injectable, Logger } from '@nestjs/common';
import { AssetsFindByFiltersRepository } from './assets-find-by-filters.repository';

@Injectable()
export class AssetsFindByFiltersService {
  private readonly logger = new Logger(AssetsFindByFiltersService.name);

  constructor(
    private readonly assetsFindByFiltersRepository: AssetsFindByFiltersRepository
  ) {}

  async getDefaultFilters() {
    try {
      this.logger.log('Getting default filters');
      const filters = await this.assetsFindByFiltersRepository.getDefaultFilters();
      return {
        categories: filters.categories,
        priceRange: {
          min: filters.minPrice,
          max: filters.maxPrice
        },
        formats: [],
        tags: filters.tags,
        sortOptions: [
          { value: 'price_asc', label: 'Price: Low to High' },
          { value: 'price_desc', label: 'Price: High to Low' },
          { value: 'date_desc', label: 'Newest First' },
          { value: 'date_asc', label: 'Oldest First' }
        ],
        assetName: filters.name
      };
    } catch (error: any) {
      this.logger.error(`Failed to get default filters: ${error.message}`);
      throw error;
    }
  }
}
