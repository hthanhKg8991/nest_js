import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  console.log('ThanhNguyen:: APP_PORT)', configService.get('APP_PORT'));
  // await app.listen(configService.get('APP_PORT'));

  await app.listen(configService.get('APP_PORT') || 3002);
  // await app.listen(process.env.APP_PORT ?? 3001);
}
bootstrap();
