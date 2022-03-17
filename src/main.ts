/* eslint-disable prettier/prettier */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // const config = new DocumentBuilder()
  //   .setTitle('Projects API')
  //   .setDescription('ESIGI - Serviço de criação de projetos')
  //   .setVersion('1.0')
  //   .addTag('projects')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config, {
  //   deepScanRoutes: true,
  // });

  // SwaggerModule.setup('api', app, document);

  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true})
  // );

  app.enableCors();
  await app.listen(3506);
}
bootstrap();
