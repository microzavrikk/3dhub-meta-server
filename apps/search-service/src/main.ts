import { NestFactory } from '@nestjs/core';
import { SearchServiceModule } from './search-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SearchServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
