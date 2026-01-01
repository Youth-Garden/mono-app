import type { ValidationError } from '@nestjs/common';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from 'helmet';
import { AppExceptionFilter } from './filters/app-exception.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';

export const bootstrap = (
  app: NestFastifyApplication
): NestFastifyApplication => {
  app.enableShutdownHooks();

  // Security headers
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'https://cdnjs.cloudflare.com',
          ],
          imgSrc: [`'self'`, 'data:', 'https://validator.swagger.io'],
          scriptSrc: [
            `'self'`,
            `'unsafe-inline'`,
            `'unsafe-eval'`,
            'https://cdnjs.cloudflare.com',
          ],
        },
      },
    })
  );

  // Global prefix (exclude swagger docs)
  app.setGlobalPrefix('api/v1', {
    exclude: ['/docs', '/docs/(.*)'],
  });

  // CORS for widget access
  app.enableCors({
    origin: true, // Allow all origins for widget (restrict in production)
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'Origin',
      'X-Requested-With',
      'x-project-id',
    ],
    credentials: true,
    maxAge: 86400,
  });

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory(errors: ValidationError[]) {
        return new BadRequestException({ errors });
      },
    })
  );

  // Global exception filters (order matters: Prisma first, then App)
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new AppExceptionFilter());

  // Global response format
  app.useGlobalInterceptors(new ResponseInterceptor());

  return app;
};
