import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, INestApplication } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT || 3000);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

bootstrap().then(() =>
  console.log('Server started in port: ' + process.env.PORT || 3000),
);
