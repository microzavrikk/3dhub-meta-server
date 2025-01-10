import { Module } from "@nestjs/common";
import { AssetsStorageMutationResolver } from "./assets-storage.mutation.resolver";
import { AssetsStorageQueryResolver } from "./assets-storage.query.resolver";
import { AssetsStorageService } from "./assets-storage.service";

@Module({
    providers: [
        AssetsStorageMutationResolver,
        AssetsStorageQueryResolver,
        AssetsStorageService
    ],
})
export class AssetsStorageModule {}
