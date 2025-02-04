import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../utils/prisma/prisma.service';
import { Prisma } from '../../utils/prisma/types';
import { AssetsFilterInput, AssetsFilterOutput } from 'apps/gateway/src/utils/graphql/types/graphql';

@Injectable()
export class GetterAssetsByFilterRepository {
  private readonly logger = new Logger(GetterAssetsByFilterRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findAssetsByFilter(input: AssetsFilterInput): Promise<AssetsFilterOutput> {
    try {
      const where = {
        AND: [
          input.categories?.length ? { category: { in: input.categories } } : {},
          input.priceRange ? {
            price: {
              gte: input.priceRange.min ?? 0,
              lte: input.priceRange.max ?? Number.MAX_SAFE_INTEGER
            }
          } : {},
          input.formats?.length ? { fileType: { in: input.formats } } : {},
          input.tags?.length ? { tags: { hasEvery: input.tags } } : {},
          input.assetName ? { name: { contains: input.assetName, mode: 'insensitive' as const } } : {}
        ].filter(condition => Object.keys(condition).length > 0)
      };

      const [assets, totalCount] = await Promise.all([
        this.prisma.thirdModel.findMany({
          where,
          skip: (input.page || 0) * (input.limit || 10),
          take: input.limit || 10,
          orderBy: input.sortBy ? this.getSortOrder(input.sortBy) : undefined
        }),
        this.prisma.thirdModel.count({ where })
      ]);

      return {
        assets: assets.map(asset => ({
          id: asset.id,
          file: [asset.fileKey],
          price: asset.price || 0,
          awsLocation: asset.awsLocation || '',
          titleName: asset.name,
          name: asset.name,
          description: asset.description,
          category: asset.category || '',
          tags: asset.tags,
          ownerId: asset.ownerId,
          publicAccess: asset.publicAccess,
          createdAt: asset.uploadDate?.toISOString(),
          updatedAt: asset.updatedAt?.toISOString()
        })),
        totalCount
      };
    } catch (error: any) {
      this.logger.error(`Failed to find assets by filter: ${error.message}`);
      throw error;
    }
  }

  private getSortOrder(sortBy: string): Prisma.ThirdModelOrderByWithRelationInput {
    const SortOrder = { asc: 'asc', desc: 'desc' } as const;
    
    switch (sortBy) {
      case 'price_asc':
        return { price: SortOrder.asc };
      case 'price_desc':
        return { price: SortOrder.desc };
      case 'date_desc':
        return { uploadDate: SortOrder.desc };
      case 'date_asc':
        return { uploadDate: SortOrder.asc };
      default:
        return { uploadDate: SortOrder.desc };
    }
  }
}
