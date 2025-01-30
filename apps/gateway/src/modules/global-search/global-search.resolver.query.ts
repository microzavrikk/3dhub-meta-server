import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { GlobalSearchQuery } from "../../utils/graphql/types/graphql";
import { GlobalSearchService } from "./global-search.service";

@Resolver(() => GlobalSearchQuery)
export class GlobalSearchQueryResolver {
    private readonly logger = new Logger(GlobalSearchQueryResolver.name);

    constructor(private readonly globalSearchService: GlobalSearchService) {}

    @Query(() => GlobalSearchQuery)
    GlobalSearch() {
        return {};
    }

    @ResolveField('search')
    async search(
        @Args('query') query: string
    ) {
        this.logger.log("[search] Global search request received");
        return this.globalSearchService.search(query);
    }
}
