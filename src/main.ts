import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInit = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Supnex Api Documentation')
    .setDescription(
      'This is api documentation for supnex for read about documentation and be aware of all endpoints',
    )
    .setVersion('1.0')
    .addServer('/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
};

const bootstrap = async () => {
  const app = await NestFactory.create<INestApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');
  swaggerInit(app);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  await app.listen(port, async () => {
    console.log(`The server running at ${await app.getUrl()}`);
  });
};

bootstrap();
