import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function toValidationErrors(
  errors: ValidationError[],
  parentPath = '',
): { property: string; message: string }[] {
  const result: { property: string; message: string }[] = [];

  for (const error of errors) {
    const property = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      for (const message of Object.values(error.constraints)) {
        result.push({ property, message });
      }
    }

    if (error.children?.length) {
      result.push(...toValidationErrors(error.children, property));
    }
  }

  return result;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) =>
        new BadRequestException(toValidationErrors(errors)),
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
