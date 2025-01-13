import { MessagePattern } from "@nestjs/microservices";
import { Controller, Inject } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { CategoryService } from "./services/category.service";

@Controller()
export class CategoryController {
    private readonly logger = new Logger(CategoryController.name);

    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @MessagePattern({ cmd: 'get-categories' })
    async getCategories(): Promise<string[]> {
        const categories = await this.categoryService.getCategories();
        return categories;
    }
}