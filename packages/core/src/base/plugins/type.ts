import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from '../types';

/**
 * Context passed through the plugin pipeline
 */
export interface RequestContext {
  url: string;
  method: string;
  config: AxiosRequestConfig;
  payload?: Record<string, unknown>;
}

/**
 * Plugin interface for extending API client functionality
 *
 * @example
 * ```typescript
 * const loggingPlugin: ApiPlugin = {
 *   name: 'logging',
 *   onRequest: (ctx) => {
 *     console.log(`[API] ${ctx.method} ${ctx.url}`);
 *     return ctx;
 *   },
 *   onResponse: (res) => {
 *     console.log(`[API] Response:`, res.status);
 *     return res;
 *   }
 * };
 * ```
 */
export interface ApiPlugin {
  /** Unique plugin identifier */
  name: string;

  /** Execution priority - higher values run first (default: 0) */
  priority?: number;

  /** Called before request is sent - can modify request context */
  onRequest?: (ctx: RequestContext) => RequestContext | Promise<RequestContext>;

  /** Called after successful response - can transform response */
  onResponse?: <T>(
    response: AxiosResponse<T>,
    ctx: RequestContext
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>;

  /** Called on error - can handle/recover from errors */
  onError?: (error: AxiosError, ctx: RequestContext) => Promise<AxiosResponse>;

  /** One-time setup hook when plugin is installed */
  install?: (instance: AxiosInstance) => void;
}
