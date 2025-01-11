import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const logger = new Logger('Users');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
    },
  });
  await app.listen();
  logger.log(`Users is running on: with NATS communication`);
}

bootstrap();