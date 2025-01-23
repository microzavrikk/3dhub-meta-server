import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { AssetsHandlerModule } from './modules/assets_handler/assets-handler.module';
import { UserStorageModule } from './modules/user-storage/user-storage.module';

@Module({
  imports: [AssetsHandlerModule, UserStorageModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}