import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { AssetsHandlerModule } from './modules/assets_handler/assets-handler.module';
import { UserStorageModule } from './modules/user-storage/user-storage.module';
import { AssetsFindByFiltersModule } from './modules/assets-find-by-filters/assets-find-by-filters.module';

@Module({
  imports: [AssetsHandlerModule, UserStorageModule, AssetsFindByFiltersModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}