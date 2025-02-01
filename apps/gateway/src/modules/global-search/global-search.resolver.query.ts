import { Resolver, Query, ResolveField, Args } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { GlobalSearchQuery, GlobalSearchResult } from "../../utils/graphql/types/graphql";
import { GlobalSearchService } from "./global-search.service";
import { PerformanceMonitor } from "libs/perfomance/perfomance.monitor";

@Resolver(() => GlobalSearchQuery)
export class GlobalSearchQueryResolver {
    private readonly logger = new Logger(GlobalSearchQueryResolver.name);
    private readonly performanceMonitor: PerformanceMonitor;

    constructor(private readonly globalSearchService: GlobalSearchService) {
        this.performanceMonitor = new PerformanceMonitor(this.logger);
    }

    @Query(() => GlobalSearchQuery)
    GlobalSearch() {
        return {};
    }

    @ResolveField(() => GlobalSearchResult)
    async search(
        @Args('query') query: string
    ) {
        this.logger.log(`[search] Initiating global search for query: "${query}"`);
        
        const metrics = await this.performanceMonitor.measurePerformance(async () => {
            return await this.globalSearchService.search(query);
        });

        this.performanceMonitor.logMetrics(metrics);
        
        return {
            ...(metrics.result as any),
            executionTime: metrics.totalTime,
            performanceMetrics: {
                totalExecutionTimeMs: metrics.totalTime,
                dbQueryTimeMs: metrics.dbQueryTime,
                processingTimeMs: metrics.processingTime,
                memoryUsageMb: Math.round(metrics.memoryUsage.heapUsed / 1024 / 1024 * 100) / 100
            }
        };
    }
}
