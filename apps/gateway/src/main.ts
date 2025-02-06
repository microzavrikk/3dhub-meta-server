import { Logger as BaseLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GatewayModule } from './gateway.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  
  const logger = new BaseLogger('Gateway');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://localhost:4222'],
      maxPayload: 100 * 1024 * 1024, // 100MB
      payload: {
        maxBytes: 100 * 1024 * 1024, // 100MB
      }
    },
  });
  
  app.enableCors({ credentials: true, origin: true });
  app.useGlobalPipes(new ValidationPipe());
  
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  
  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 4001);
 
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();