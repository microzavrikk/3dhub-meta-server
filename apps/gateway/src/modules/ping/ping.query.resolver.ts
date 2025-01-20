import { Query, Resolver, ResolveField } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver('PingQuery')
export class PingQueryResolver {
    private readonly logger = new Logger(PingQueryResolver.name);

    @Query('Ping')
    Ping() {
        return {};
    }

    @ResolveField('ping')
    ping(): string {
        this.logger.log('Ping request received');
        return 'pong';
    }
}
