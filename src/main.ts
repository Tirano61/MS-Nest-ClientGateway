import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

async function bootstrap() {

  const logger = new  Logger('Main-Geteway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  console.log('Hola mundo - primer cambio!!');

  await app.listen(envs.port);
  logger.log(`Gateway running on port: ${ envs.port}`)
}
bootstrap();

