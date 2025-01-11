import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StorageModule } from './storage.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Storage');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(StorageModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });
  await app.listen();
  logger.log(`Storage is running on: with NATS communication`);
}

bootstrap();
