import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  
  constructor(@Inject('ASSETS_HANDLER_SERVICE') private readonly client: ClientProxy) {}

  private readonly categories: string[] = [
    'Animals & Pets',
    'Architecture',
    'Art & Abstract',
    'Cars & Vehicles',
    'Characters & Creatures',
    'Cultural Heritage & History',
    'Electronics & Gadgets',
    'Fashion & Style',
    'Food & Drink',
    'Furniture & Home',
    'Music',
    'Nature & Plants',
    'News & Politics',
    'People',
    'Places & Travel',
    'Science & Technology',
    'Sports & Fitness',
    'Weapons & Military',
  ];

  async getAllCategoryInS3(): Promise<string[]> {
    try {
      const categories = await this.client.send({ cmd: 'get-all-category-in-s3' }, {}).toPromise();
      return categories;
    } catch (error: any) {
      this.logger.error(`Failed to get all category in s3: ${error.message}`);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    return this.categories;
  }
}