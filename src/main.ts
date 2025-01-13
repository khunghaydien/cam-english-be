import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000', // Your frontend URL
      'https://cam-english-fe.vercel.app', // Your backend URL
    ],
    credentials: true, // Allow cookies and authorization headers
    allowedHeaders: [
      'Accept',
      'Authorization',
      'X-Requested-With',
      'apollo-require-preflight',
      'Content-Type',
      'Cookie',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // HTTP methods allowed
  });

  // Use express body-parser middleware for large payloads
  app.use(express.json({ limit: "16mb" }));
  app.use(express.urlencoded({ limit: "16mb", extended: true, parameterLimit: 50000 }));

  app.use(cookieParser());

  // Use global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any extra properties that are not defined in the DTO
      transform: true, // Automatically transforms payloads to DTO instances
      exceptionFactory(errors) {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(', ');
          return accumulator;
        }, {});
        throw new BadRequestException(formattedErrors);
      },
    }),
  );

  app.setGlobalPrefix('api');
  const PORT = process.env.PORT || 8080;
  await app.listen(PORT);
}
bootstrap();