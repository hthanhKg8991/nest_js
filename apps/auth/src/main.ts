import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  // cross domain
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  useContainer(app.select(AuthModule), { fallbackOnErrors: true });
  // await app.listen(process.env.APP_PORT ?? 3000);
  await app.listen(3000);
}
bootstrap();
