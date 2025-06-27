import { ResponseSuccessInterceptor } from '@common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1/');

  app.use(cookieParser());

  app.useGlobalInterceptors(
    new ResponseSuccessInterceptor()
  );

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
