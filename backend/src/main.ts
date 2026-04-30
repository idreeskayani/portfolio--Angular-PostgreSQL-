import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedDatabase } from './seed/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });

  const dataSource = app.get(DataSource);
  await seedDatabase(dataSource);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
