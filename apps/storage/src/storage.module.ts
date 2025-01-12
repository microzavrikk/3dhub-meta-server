import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { AssetsHandlerModule } from './modules/assets_handler/assets-handler.module';

@Module({
  imports: [AssetsHandlerModule],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}