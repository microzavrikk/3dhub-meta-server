import { Logger } from '@nestjs/common';

interface PerformanceMetrics {
    totalTime: number;
    dbQueryTime: number;
    processingTime: number;
    memoryUsage: {
        heapTotal: number;
        heapUsed: number;
        external: number;
        rss: number;
    };
    result: any;
}

export class PerformanceMonitor {
    constructor(private readonly logger: Logger) {}

    async measurePerformance<T>(operation: () => Promise<T>): Promise<PerformanceMetrics> {
        const startTime = process.hrtime();
        const startMemory = process.memoryUsage();
        
        let result;
        try {
            result = await operation();
        } catch (error: any) {
            const endTime = process.hrtime(startTime);
            const totalTimeMs = (endTime[0] * 1000 + endTime[1] / 1000000);
            
            this.logger.error(`Operation failed after ${totalTimeMs}ms`, error.stack);
            throw error;
        }

        const endTime = process.hrtime(startTime);
        const endMemory = process.memoryUsage();

        const totalTimeMs = (endTime[0] * 1000 + endTime[1] / 1000000);
        
        // Estimate DB vs processing time (simplified)
        const dbQueryTimeMs = totalTimeMs * 0.7; // Assuming 70% is DB time
        const processingTimeMs = totalTimeMs * 0.3; // Assuming 30% is processing time

        return {
            totalTime: Math.round(totalTimeMs),
            dbQueryTime: Math.round(dbQueryTimeMs),
            processingTime: Math.round(processingTimeMs),
            memoryUsage: {
                heapTotal: endMemory.heapTotal - startMemory.heapTotal,
                heapUsed: endMemory.heapUsed - startMemory.heapUsed,
                external: endMemory.external - startMemory.external,
                rss: endMemory.rss - startMemory.rss
            },
            result
        };
    }

    logMetrics(metrics: PerformanceMetrics): void {
        this.logger.log(
            `Performance metrics:
            Total time: ${metrics.totalTime}ms
            DB query time: ${metrics.dbQueryTime}ms
            Processing time: ${metrics.processingTime}ms
            Memory usage:
                Heap total: ${Math.round(metrics.memoryUsage.heapTotal / 1024 / 1024)}MB
                Heap used: ${Math.round(metrics.memoryUsage.heapUsed / 1024 / 1024)}MB
                External: ${Math.round(metrics.memoryUsage.external / 1024 / 1024)}MB
                RSS: ${Math.round(metrics.memoryUsage.rss / 1024 / 1024)}MB`
        );
    }
}
