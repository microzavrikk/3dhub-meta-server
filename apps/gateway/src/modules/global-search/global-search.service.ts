import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '../../utils/graphql/types/graphql';

@Injectable()
export class GlobalSearchService {
    private readonly logger = new Logger(GlobalSearchService.name);

    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
        @Inject('ASSETS_HANDLER_SERVICE') private readonly assetsClient: ClientProxy,
    ) {}

    async search(query: string): Promise<{users: User[], modelsCount: number}> {
        try {
            const [modelsCount, users] = await Promise.all([
                this.assetsClient.send({ cmd: 'search-models-count' }, query).toPromise(),
                this.userClient.send({ cmd: 'user-search' }, query).toPromise()
            ]);

            return {
                users: users || [],
                modelsCount: modelsCount || 0
            };
        } catch (error: any) {
            this.logger.error(`Error in global search: ${error.message}`);
            return {
                users: [],
                modelsCount: 0
            };
        }
    }
}
