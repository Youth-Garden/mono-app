/**
 * Common regex patterns for validation
 */

/**
 * Email regex pattern (basic validation)
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL regex pattern (basic validation)
 */
export const URL_REGEX = /^https?:\/\/.+/;

/**
 * UUID v4 regex pattern
 */
export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Slug regex pattern
 * - Lowercase letters, numbers, and hyphens only
 */
export const SLUG_REGEX = /^[a-z0-9-]+$/;

/**
 * Domain validation regex
 * Allows: example.com, sub.example.com, localhost, etc.
 */
export const DOMAIN_REGEX =
  /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$|^localhost$/;
