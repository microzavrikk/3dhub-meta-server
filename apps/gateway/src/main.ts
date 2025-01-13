import { Logger as BaseLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GatewayModule } from './gateway.module';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(GatewayModule, new FastifyAdapter());
  const logger = new BaseLogger('Gateway');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS, 
    options: {
      servers: ['nats://localhost:4222'], 
    },
  });

  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 4001);
}
bootstrap();