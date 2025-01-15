import { Logger as BaseLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  
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
 
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();