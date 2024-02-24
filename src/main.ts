import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Logger } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   const logger = new Logger();
//   logger.log('Application starting...');

//   await app.listen(3000);
// }
// bootstrap();

