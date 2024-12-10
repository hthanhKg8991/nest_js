import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.useGlobalPipes(new ValidationPipe());

  // await app.listen(process.env.APP_PORT ?? 3002);
  await app.listen(3001);
}
bootstrap();
