import { Module } from '@nestjs/common';
import { CategoryQueryResolver } from './resolvers/category.resolver.query';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
      {
        name: 'ASSETS_HANDLER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      }
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryQueryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}