import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
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

  async getCategories(): Promise<string[]> {
    return this.categories;
  }
}