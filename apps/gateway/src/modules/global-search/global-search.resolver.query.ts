import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { GlobalSearchQuery, GlobalSearchResult } from "../../utils/graphql/types/graphql";
import { GlobalSearchService } from "./global-search.service";

@Resolver(() => GlobalSearchQuery)
export class GlobalSearchQueryResolver {
    private readonly logger = new Logger(GlobalSearchQueryResolver.name);

    constructor(private readonly globalSearchService: GlobalSearchService) {}

    @Query(() => GlobalSearchQuery)
    GlobalSearch() {
        return {};
    }

    @ResolveField(() => GlobalSearchResult)
    async search(
        @Args('query') query: string
    ) {
        this.logger.log("[search] Global search request received");
        const startTime = Date.now();
        
        const result = await this.globalSearchService.search(query);
        
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        this.logger.log(`[search] Execution time: ${executionTime}ms`);
        
        return {
            ...result,
            executionTime
        };
    }
}
