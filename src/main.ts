import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterceptor } from './common/errors/interceptors/ConflictInterceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/DatabaseInterceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/NotFoundInterceptor';
import { UnathorizedInterceptor } from './common/errors/interceptors/UnathorizedInterceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnathorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  //app.useGlobalFilters(new HttpExceptionFilter());

 const config = new DocumentBuilder()
    .setTitle('Simple Blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0')
    //.addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
