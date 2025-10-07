import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  app.enableCors({
    origin: '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  if (env === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('CRM APIs Documentation')
      .setDescription('Adekunle CRM APIs Documentation')
      .setVersion('1.0')
      .addTag('CRM')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token', // Name of the security scheme
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        requestInterceptor: (req) => {
          // Dynamically set the Authorization header
          const token = req.headers?.authorization || ''; // Pull from incoming request headers
          if (token) {
            req.headers['Authorization'] = token; // Assign token
          }
          return req;
        },
      },
    });
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(PORT);
}
bootstrap();
