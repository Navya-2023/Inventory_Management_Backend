import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
/**
 * Function to bootstrap the NestJS application
 * It then loads the enviornment variables.
 * Then it creates an instance of the AppModule.
 * Start the application and listen for incoming HTTP requests on port 3000
 * Call the bootstrap function to start the application
 **/
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
