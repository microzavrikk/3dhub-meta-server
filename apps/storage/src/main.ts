import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StorageModule } from './storage.module';

async function bootstrap() {
  const app = await NestFactory.create(StorageModule);
  
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  };

  app.connectMicroservice(microserviceOptions);
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 4009);
}

bootstrap();
