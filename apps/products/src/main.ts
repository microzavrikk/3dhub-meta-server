import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductsModule } from './products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  };

  app.connectMicroservice(microserviceOptions);
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 4007);
}

bootstrap();
