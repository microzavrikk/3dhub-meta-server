import { Injectable, Logger } from '@nestjs/common';
import { AssetsFilterInput, AssetsFilterOutput } from 'apps/gateway/src/utils/graphql/types/graphql';
import { GetterAssetsByFilterRepository } from './getter-assets-by-filter.repository';

@Injectable()
export class GetterAssetsByFilterService {
  private readonly logger = new Logger(GetterAssetsByFilterService.name);

  constructor(
    private readonly getterAssetsByFilterRepository: GetterAssetsByFilterRepository
  ) {}

  async findAssetsByFilter(input: AssetsFilterInput): Promise<AssetsFilterOutput> {
    try {
      return await this.getterAssetsByFilterRepository.findAssetsByFilter(input);
    } catch (error: any) {
      this.logger.error(`Failed to find assets by filter: ${error.message}`);
      throw error;
    }
  }
}
