import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8877,
    },
  });
  
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  };

  await app.listen();
}

bootstrap();
