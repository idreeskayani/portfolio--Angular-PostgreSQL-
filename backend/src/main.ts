import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { seedDatabase } from './seed/seed';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const uploadsPath = join(__dirname, '..', 'uploads');
  if (!existsSync(uploadsPath)) mkdirSync(uploadsPath, { recursive: true });
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowed = [
        'http://localhost:4200',
        /\.vercel\.app$/,
        /\.up\.railway\.app$/
      ];
      const isAllowed = allowed.some(o => typeof o === 'string' ? o === origin : o.test(origin));
      callback(isAllowed ? null : new Error('CORS not allowed'), isAllowed);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });

  const dataSource = app.get(DataSource);
  await seedDatabase(dataSource);

  await app.listen(process.env.PORT ?? 3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
