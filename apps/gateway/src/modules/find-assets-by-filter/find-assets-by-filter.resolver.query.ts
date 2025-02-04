import { Args, Query, Resolver } from '@nestjs/graphql';
import { AssetsFilterInput, AssetsFilterOutput } from '../../utils/graphql/types/graphql';
import { FindAssetsByFilterService } from './find-assets-by-filter.service';

@Resolver('FindAssetsByFilter')
export class FindAssetsByFilterQueryResolver {
  constructor(
    private readonly findAssetsByFilterService: FindAssetsByFilterService,
  ) {}

  @Query(() => AssetsFilterOutput)
  async findAssetsByFilter(
    @Args('input') input: AssetsFilterInput,
  ): Promise<AssetsFilterOutput> {
    return this.findAssetsByFilterService.findAssetsByFilter(input);
  }
}
