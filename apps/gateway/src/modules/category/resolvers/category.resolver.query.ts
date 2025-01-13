import { Resolver, Query, ResolveField } from "@nestjs/graphql";
import { Logger } from "@nestjs/common";
import { CategoryQuery } from "../../../utils/graphql/types/graphql";
import { CategoryService } from "../services/category.service"

@Resolver(() => CategoryQuery)
export class CategoryQueryResolver {
    private readonly logger = new Logger(CategoryQueryResolver.name);

    constructor(private readonly categoryService: CategoryService) {}

    @Query(() => CategoryQuery)
    async Category() {
        return {};
    }

    @ResolveField('getCategories')
    async getCategories(): Promise<string[]> {
        this.logger.log("[getCategories] Get categories request received");
        const categories = await this.categoryService.getCategories();
        return categories;
    }
}