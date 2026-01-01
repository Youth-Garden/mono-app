import { getEnv } from '../../lib/utils';
import type { AppConfig } from './type';

/**
 * Application configuration factory
 * Used with NestJS ConfigModule.forRoot({ load: [appConfig] })
 */
export const appConfig = (): AppConfig => {
  const NODE_ENV = getEnv('NODE_ENV', 'development');
  const PORT = Number(getEnv('PORT', '3001'));
  const DATABASE_URL = getEnv('DATABASE_URL');

  // JWT Auth (defaults provided, so will never be undefined)
  const JWT_SECRET = getEnv(
    'JWT_SECRET',
    'dev-secret-change-in-production'
  ) as string;
  const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN', '15m') as string;
  const JWT_REFRESH_SECRET = getEnv(
    'JWT_REFRESH_SECRET',
    'dev-refresh-secret-change-in-production'
  ) as string;
  const JWT_REFRESH_EXPIRES_IN = getEnv(
    'JWT_REFRESH_EXPIRES_IN',
    '7d'
  ) as string;

  // Rate Limit
  const RATE_LIMIT_TTL_MS = Number(getEnv('RATE_LIMIT_TTL_MS', 60000));
  const RATE_LIMIT_MAX = Number(getEnv('RATE_LIMIT_MAX', 100));

  return {
    env: {
      type: NODE_ENV,
      isDevelopment: NODE_ENV === 'development',
      isProduction: NODE_ENV === 'production',
    },
    api: {
      port: PORT,
      globalPrefix: 'api/v1',
    },
    db: {
      url: DATABASE_URL,
    },
    auth: {
      jwtSecret: JWT_SECRET,
      jwtExpiresIn: JWT_EXPIRES_IN,
      jwtRefreshSecret: JWT_REFRESH_SECRET,
      jwtRefreshExpiresIn: JWT_REFRESH_EXPIRES_IN,
    },
    rateLimit: {
      ttlMs: RATE_LIMIT_TTL_MS,
      max: RATE_LIMIT_MAX,
    },
  };
};
