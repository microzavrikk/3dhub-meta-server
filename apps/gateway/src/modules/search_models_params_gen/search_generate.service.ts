import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { DefaultFilters } from '../../utils/graphql/types/graphql';

@Injectable()
export class SearchGenerateService {
  private readonly logger = new Logger(SearchGenerateService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async getModelsCount(query: string): Promise<number> {
    try {
      const count = await this.client.send({ cmd: 'search-models-count' }, query).toPromise();
      this.logger.log(`Found ${count} models matching query: ${query}`);
      return count;
    } catch (error: any) {
      this.logger.error(`Failed to get models count: ${error.message}`);
      return 0;
    }
  }

  async getDefaultFilters(): Promise<DefaultFilters> {
    return this.client.send({ cmd: 'get-default-filters' }, {}).toPromise();
  }
}
