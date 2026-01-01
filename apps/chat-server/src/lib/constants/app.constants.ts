/**
 * API Route Prefixes
 */
export const Prefix = {
  API: 'api/v1',
  ADMIN: 'admin',
  PUBLIC: 'public',
} as const;

/**
 * Decorator Keys (for metadata)
 */
export const PUBLIC_ROUTE_KEY = 'isPublic';
export const ROLES_DECORATOR_KEY = 'roles';

/**
 * Pagination Defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

/**
 * Rate Limiting Defaults
 */
export const RATE_LIMIT = {
  DEFAULT_TTL_MS: 60_000, // 1 minute
  DEFAULT_MAX: 100,
} as const;

/**
 * Cache TTL (in seconds)
 */
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86_400, // 24 hours
} as const;
