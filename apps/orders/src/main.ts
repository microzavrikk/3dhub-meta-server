import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Orders');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrdersModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });
  await app.listen();
  logger.log(`Orders is running on: with NATS communication`);
}

bootstrap();
