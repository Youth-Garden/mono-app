import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import fastify from 'fastify';
import { bootstrap as setupAppConfig } from './app';
import { AppModule } from './app.module';
import type { AppConfig } from './config/app/type';
import { AppLogger, getLogLevels } from './lib/logger';

// Create application logger
const logger = new AppLogger('Bootstrap');

async function createNestApp() {
  const fastifyInstance = fastify({ logger: false });

  // Handle empty body for POST/DELETE requests
  fastifyInstance.addHook('preParsing', (request, _, __, done) => {
    const contentType = request.headers['content-type'];
    const contentLength = request.headers['content-length'];

    if (
      ['POST', 'DELETE'].includes(request.method) &&
      contentType === 'application/json' &&
      (!contentLength || contentLength === '0')
    ) {
      delete request.headers['content-type'];
    }

    done();
  });

  const adapter = new FastifyAdapter(fastifyInstance);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      logger: getLogLevels(),
      bufferLogs: true,
    }
  );

  // Use custom logger
  app.useLogger(new AppLogger());

  // Apply global configurations
  setupAppConfig(app);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Spectre Chat API')
    .setDescription('API for Spectre Chat Widget')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-project-id',
        in: 'header',
        description: 'Project ID for authentication',
      },
      'ProjectId'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Spectre Chat API',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  await app.init();
  return app;
}

async function bootstrap() {
  try {
    const app = await createNestApp();
    const configService = app.get(ConfigService);

    const envConfig = configService.get<AppConfig['env']>('env');
    const apiConfig = configService.get<AppConfig['api']>('api');
    const port = apiConfig?.port || 3001;

    await app.listen(port, '0.0.0.0');

    // Log startup banner
    logger.logStartup({
      port,
      env: envConfig?.type || 'development',
      apiPrefix: apiConfig?.globalPrefix || 'api/v1',
    });
  } catch (error) {
    logger.error('Failed to start application', (error as Error).stack);
    process.exit(1);
  }
}

bootstrap();
