/**
 * Environment Types
 */

export type NodeEnv = 'development' | 'production' | 'test';

export type Environment = {
  // Core
  NODE_ENV: NodeEnv;
  PORT: string;

  // Database
  DATABASE_URL: string;

  // JWT Auth
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;
  JWT_REFRESH_SECRET?: string;
  JWT_REFRESH_EXPIRES_IN?: string;

  // Rate Limiting
  RATE_LIMIT_TTL_MS?: number;
  RATE_LIMIT_MAX?: number;

  // Logging
  LOG_LEVEL?: 'debug' | 'info' | 'warn' | 'error';
};
