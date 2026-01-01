/**
 * Common utility types
 */

/**
 * Make selected properties required
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make all properties optional except specified ones
 */
export type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> &
  Pick<T, K>;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Maybe type (nullable and optional)
 */
export type Maybe<T> = T | null | undefined;

/**
 * Dictionary type
 */
export type Dictionary<T = unknown> = Record<string, T>;

/**
 * Async function type
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * Class constructor type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = object> = new (...args: any[]) => T;
