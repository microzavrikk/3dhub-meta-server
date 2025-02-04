import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { AssetsFilterInput, AssetsFilterOutput } from '../../utils/graphql/types/graphql';

@Injectable()
export class FindAssetsByFilterService {
  private readonly logger = new Logger(FindAssetsByFilterService.name);

  constructor(
    @Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy
  ) {}

  async findAssetsByFilter(input: AssetsFilterInput): Promise<AssetsFilterOutput> {
    return this.client.send({ cmd: 'find-assets-by-filter' }, input).toPromise();
  }
}
