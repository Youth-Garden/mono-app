import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig as IDefaultAxiosRequestConfig,
} from 'axios';
import { BaseRequestMethod } from './constants';
import { IMapper } from './mapper';
import type { ApiPlugin, RequestContext } from './plugins';
import { AxiosRequestConfig, BaseResponse, responseDefault } from './types';

export interface BaseRequestConfig {
  baseURL: string;
  mapper?: IMapper;
  timeout?: number;
}

export abstract class BaseRequest {
  public axiosInstance: AxiosInstance;
  public baseURL: string;
  public mapper?: IMapper;

  private plugins: ApiPlugin[] = [];

  constructor({ baseURL, mapper, timeout = 30000 }: BaseRequestConfig) {
    this.baseURL = baseURL;
    this.mapper = mapper;

    this.axiosInstance = axios.create({
      baseURL,
      timeout,
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Plugin System
  // ─────────────────────────────────────────────────────────────

  /**
   * Register a plugin to extend API client functionality
   * Plugins are sorted by priority (higher runs first)
   *
   * @example
   * ```typescript
   * api.use(authPlugin({ ... }));           // priority: 0 (default)
   * api.use(loggingPlugin(), { priority: 100 }); // runs first
   * ```
   */
  public use(plugin: ApiPlugin, options?: { priority?: number }): this {
    const pluginWithPriority = {
      ...plugin,
      priority: options?.priority ?? plugin.priority ?? 0,
    };
    this.plugins.push(pluginWithPriority);
    // Sort by priority descending (higher priority runs first)
    this.plugins.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
    plugin.install?.(this.axiosInstance);
    return this;
  }

  /**
   * Check if a plugin is registered
   */
  public hasPlugin(name: string): boolean {
    return this.plugins.some((p) => p.name === name);
  }

  // ─────────────────────────────────────────────────────────────
  // HTTP Methods
  // ─────────────────────────────────────────────────────────────

  public get = <T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => this.request<T>(url, BaseRequestMethod.GET, params, config);

  public post = <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => this.request<T>(url, BaseRequestMethod.POST, data, config);

  public put = <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => this.request<T>(url, BaseRequestMethod.PUT, data, config);

  public patch = <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => this.request<T>(url, BaseRequestMethod.PATCH, data, config);

  public delete = <T>(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) => this.request<T>(url, BaseRequestMethod.DELETE, data, config);

  // ─────────────────────────────────────────────────────────────
  // Core Request Logic
  // ─────────────────────────────────────────────────────────────

  public async request<T = unknown>(
    url: string,
    method: BaseRequestMethod,
    payload: Record<string, unknown> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    try {
      if (!this.baseURL) throw new Error("The API URL doesn't set up.");

      const {
        mapperKey = '',
        headers: headersProps = {},
        ...axiosConfig
      } = config;

      // Build request context
      let ctx: RequestContext = {
        url,
        method,
        payload,
        config: {
          ...axiosConfig,
          headers: { ...headersProps },
        },
      };

      // Run onRequest plugins
      for (const plugin of this.plugins) {
        if (plugin.onRequest) {
          ctx = await plugin.onRequest(ctx);
        }
      }

      // Build final config
      const finalConfig = this.buildConfig(url, mapperKey, ctx.config);

      // Execute request
      const body: IDefaultAxiosRequestConfig =
        method === BaseRequestMethod.GET
          ? { params: payload }
          : { data: payload };

      const result: AxiosResponse<BaseResponse<T>> = await this.axiosInstance({
        url,
        method,
        ...body,
        ...finalConfig,
      });

      // Run onResponse plugins
      let response = result;
      for (const plugin of this.plugins) {
        if (plugin.onResponse) {
          response = await plugin.onResponse(response, ctx);
        }
      }

      return response.data;
    } catch (error: Error | unknown) {
      return {
        ...responseDefault,
        message: error instanceof Error ? error.message : 'Unknown error',
      } as BaseResponse<T>;
    }
  }

  private buildConfig(
    _url: string,
    mapperKey: string,
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    const mapper = this.mapper?.getMapper?.(mapperKey || _url);

    const _config: AxiosRequestConfig = {
      baseURL: config.baseURL ?? this.baseURL, // Per-request baseURL takes precedence
      ...config,
      validateStatus: () => true,
    };

    if (mapper) {
      _config.transformResponse = [
        ...(axios.defaults.transformResponse as unknown[]),
        mapper,
      ] as IDefaultAxiosRequestConfig['transformResponse'];
    }

    return _config;
  }
}
