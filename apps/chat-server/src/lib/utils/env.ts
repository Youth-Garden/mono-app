/**
 * Environment Configuration
 *
 * Type-safe environment variable management with validation.
 * Follows the 12-factor app methodology for configuration.
 */

import type { Environment } from '../types';

/**
 * Type-safe environment variable getter
 *
 * @param key - Environment variable name
 * @param fallback - Optional fallback value if not set
 * @returns The environment variable value
 * @throws Error if required variable is missing (no fallback provided)
 *
 * @example
 * // Required variable (throws if missing)
 * const dbUrl = getEnv('DATABASE_URL');
 *
 * // Optional variable with fallback
 * const port = getEnv('PORT', '3001');
 */
export const getEnv = <K extends keyof Environment>(
  key: K,
  fallback?: Environment[K]
): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (value === undefined) {
    // Handle falsy fallback values that should still be used
    if (fallback === '' || fallback === 0) {
      return fallback;
    }
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(
      `[ENV] Missing required environment variable: ${key}. ` +
        `Please check your .env file or environment configuration.`
    );
  }

  return value;
};

/**
 * Check if running in development mode
 */
export const isDevelopment = (): boolean =>
  getEnv('NODE_ENV', 'development') === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = (): boolean =>
  getEnv('NODE_ENV', 'development') === 'production';

/**
 * Check if running in test mode
 */
export const isTest = (): boolean =>
  getEnv('NODE_ENV', 'development') === 'test';

/**
 * Get numeric environment variable
 *
 * @example
 * const port = getEnvNumber('PORT', 3001);
 */
export const getEnvNumber = (
  key: keyof Environment,
  fallback?: number
): number => {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`[ENV] Missing required environment variable: ${key}`);
  }

  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(
      `[ENV] Invalid number for environment variable: ${key}="${value}"`
    );
  }

  return parsed;
};

/**
 * Get boolean environment variable
 * Accepts: 'true', '1', 'yes' as truthy values
 *
 * @example
 * const debug = getEnvBoolean('DEBUG', false);
 */
export const getEnvBoolean = (
  key: keyof Environment,
  fallback?: boolean
): boolean => {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`[ENV] Missing required environment variable: ${key}`);
  }

  return ['true', '1', 'yes'].includes(value.toLowerCase());
};
