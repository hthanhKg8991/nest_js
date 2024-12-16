import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { ValidationPipe } from '@nestjs/common';
import { RmqService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  app.useGlobalPipes(new ValidationPipe());
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();

  // await app.listen(process.env.APP_PORT ?? 3002);
  // await app.listen(3001);
}
bootstrap();
