import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';

@Injectable()
export class AssetsFindByFiltersRepository {
  private readonly logger = new Logger(AssetsFindByFiltersRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async getDefaultFilters() {
    try {
      // Get total count of models
      const totalCount = await this.prisma.thirdModel.count();

      // Get categories with unique titleName count
      const categoriesWithCount = await this.prisma.thirdModel.groupBy({
        by: ['category', 'name'],
        where: {
          category: {
            not: null
          }
        }
      });

      // Count unique titleNames per category
      const categoryCount = categoriesWithCount.reduce((acc, curr) => {
        const category = curr.category || '';
        if (!acc[category]) {
          acc[category] = new Set();
        }
        acc[category].add(curr.name);
        return acc;
      }, {} as Record<string, Set<string>>);

      // Convert Sets to counts
      const categoryCounts = Object.entries(categoryCount).reduce((acc, [category, titleNames]) => {
        acc[category] = titleNames.size;
        return acc;
      }, {} as Record<string, number>);

      return {
        categories: Object.entries(categoryCounts).map(([category, count], index) => ({
          id: index.toString(),
          name: category,
          count: count
        })),
        minPrice: 0,
        maxPrice: 1000,
        tags: [],
        name: '',
        totalCount
      };
    } catch (error: any) {
      this.logger.error(`Failed to get default filters: ${error.message}`);
      throw error;
    }
  }
}
