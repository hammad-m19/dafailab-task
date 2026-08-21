const { NestFactory, HttpAdapterHost } = require('@nestjs/core');
const { AppModule } = require('../dist/app.module');
const { ValidationPipe } = require('@nestjs/common');
const { DocumentBuilder, SwaggerModule } = require('@nestjs/swagger');
const Sentry = require('@sentry/nestjs');
const { SentryFilter } = require('../dist/sentry.filter');
const { ExpressAdapter } = require('@nestjs/platform-express');
const express = require('express');

const server = express();
let isInitialized = false;

async function bootstrap() {
  if (!isInitialized) {
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
      });
    }

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
      .setTitle('AI Chatbot API')
      .setDescription('The API documentation for the AI Chatbot Application')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new SentryFilter(httpAdapter));

    await app.init();
    isInitialized = true;
  }
}

module.exports = async (req, res) => {
  try {
    await bootstrap();
    server(req, res);
  } catch (error) {
    res.status(500).json({
      error: 'Vercel Serverless Initialization Error',
      message: error?.message || String(error),
      stack: error?.stack,
    });
  }
};
