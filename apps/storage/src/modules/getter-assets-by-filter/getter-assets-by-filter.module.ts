import { Module } from '@nestjs/common';
import { GetterAssetsByFilterService } from './getter-assets-by-filter.service';
import { GetterAssetsByFilterRepository } from './getter-assets-by-filter.repository';
import { PrismaModule } from '../../utils/prisma/prisma.module';
import { GetterAssetsByFilterController } from './getter-assets-by-filter.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GetterAssetsByFilterController],
  providers: [GetterAssetsByFilterService, GetterAssetsByFilterRepository],
  exports: [GetterAssetsByFilterService]
})
export class GetterAssetsByFilterModule {}
