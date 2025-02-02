import { Module } from '@nestjs/common';
import { AssetsFindByFiltersService } from './assets-find-by-filters.service';
import { AssetsFindByFiltersRepository } from './assets-find-by-filters.repository';
import { PrismaModule } from '../../utils/prisma/prisma.module';
import { AssetsFindByFiltersController } from './assets-find-by-filters.controller';


@Module({
  imports: [PrismaModule],
  controllers: [AssetsFindByFiltersController],
  providers: [AssetsFindByFiltersService, AssetsFindByFiltersRepository],
  exports: [AssetsFindByFiltersService]
})
export class AssetsFindByFiltersModule {}
