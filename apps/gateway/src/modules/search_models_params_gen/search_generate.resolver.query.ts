import { Query, Resolver } from '@nestjs/graphql';
import { DefaultFilters } from '../../utils/graphql/types/graphql';
import { SearchGenerateService } from './search_generate.service';

@Resolver('SearchGenerate')
export class SearchGenerateQueryResolver {
  constructor(
    private readonly searchGenerateService: SearchGenerateService,
  ) {}

  @Query(() => DefaultFilters)
  async getDefaultFilters(): Promise<DefaultFilters> {
    return this.searchGenerateService.getDefaultFilters();
  }
}
    