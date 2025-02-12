import { Args, Query, Resolver } from '@nestjs/graphql';
import { AssetsFilterInput, AssetsFilterOutput } from '../../utils/graphql/types/graphql';
import { FindAssetsByFilterService } from './find-assets-by-filter.service';
import { Logger } from '@nestjs/common';

@Resolver('FindAssetsByFilter')
export class FindAssetsByFilterQueryResolver {
  private readonly logger = new Logger(FindAssetsByFilterQueryResolver.name);

  constructor(
    private readonly findAssetsByFilterService: FindAssetsByFilterService,
  ) {}

  @Query(() => AssetsFilterOutput)
  async findAssetsByFilter(
    @Args('input') input: AssetsFilterInput,
  ): Promise<AssetsFilterOutput> {
    this.logger.log(
      `Searching assets with parameters: ${JSON.stringify({
        categories: input.categories || [],
        priceRange: input.priceRange || 'not specified',
        formats: input.formats || [],
        tags: input.tags || [],
        sortBy: input.sortBy || 'not specified',
        assetName: input.assetName || 'not specified',
        page: input.page || 1,
        limit: input.limit || 10
      }, null, 2)}`
    );

    return this.findAssetsByFilterService.findAssetsByFilter(input);
  }
}
