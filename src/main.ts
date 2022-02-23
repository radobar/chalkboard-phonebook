import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception-filter';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.use(helmet({
    frameguard: false,
    noSniff: false,
    xssFilter: false,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Nest-example')
    .setDescription('Nest-example - Example CRUD project')
    .setVersion('1.0')
    .addTag('Nest-example')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(config.get('app.port'));
}
bootstrap();
