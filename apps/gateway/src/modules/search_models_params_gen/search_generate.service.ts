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

  async getDefaultFilters(): Promise<DefaultFilters> {
    return this.client.send({ cmd: 'get-default-filters' }, {}).toPromise();
  }
}
