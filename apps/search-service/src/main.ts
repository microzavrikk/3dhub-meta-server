import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SearchServiceModule } from './search-service.module';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger('SearchService');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchServiceModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });
  await app.listen();
  logger.log(`SearchService is running on: with NATS communication`);
}

bootstrap();