import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    //configuration for cookie session
    keys:['sdfawefadfg']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //makes sure that the incoming requests don't have extraneous properties.
    }),
  );
  await app.listen(3000);
}
bootstrap();
