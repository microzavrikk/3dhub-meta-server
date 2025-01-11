import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Products');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductsModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });
  await app.listen();
  logger.log(`Products is running on: with NATS communication`);
}

bootstrap();
