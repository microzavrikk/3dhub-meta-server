import { AssetsStorageQuery } from "../../../utils/graphql/types/graphql";
import { Args, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { FileOutput } from "../../../utils/graphql/types/graphql";

@Resolver(() => AssetsStorageQuery)
export class AssetsStorageQueryResolver {
    private readonly logger = new Logger(AssetsStorageQueryResolver.name);
    
    @Query(() => AssetsStorageQuery)
    async AssetsQuery() {
        return {}
    }

    @ResolveField('getFileByUserId')
    async getFileByUserId(@Args('category') category: string, @Args('userId') userId: string): Promise<FileOutput> {
        this.logger.log("[getFileByUserId] Get asset request received");
        return new FileOutput();
    }

    @ResolveField('getFileByUserIdAndFileName')
    async getFileByUserIdAndFileName(@Args('category') category: string, 
                                     @Args('userId') userId: string, 
                                     @Args('fileName') fileName: string, ): Promise<FileOutput> {
        this.logger.log("[getFileByUserIdAndFileName] Get assets request received");
        return new FileOutput();
    }
}