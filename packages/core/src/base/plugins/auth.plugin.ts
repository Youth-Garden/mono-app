import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiPlugin, RequestContext } from './type';

export interface AuthPluginOptions {
  /** Get current access token */
  getToken: () => string | null;
  /** Refresh and return new token */
  refreshToken: () => Promise<string>;
  /** Determine if error should trigger refresh */
  shouldRefresh: (error: AxiosError) => boolean;
  /** Called when refresh fails (e.g., redirect to login) */
  onRefreshFailed?: (error: unknown) => void;
  /** Header key for auth token (default: 'Authorization') */
  headerKey?: string;
  /** Token prefix (default: 'Bearer') */
  tokenPrefix?: string;
}

/**
 * Authentication plugin with automatic token refresh
 *
 * @example
 * ```typescript
 * api.use(authPlugin({
 *   getToken: () => localStorage.getItem('token'),
 *   refreshToken: async () => {
 *     const res = await axios.post('/auth/refresh');
 *     localStorage.setItem('token', res.data.token);
 *     return res.data.token;
 *   },
 *   shouldRefresh: (err) => err.response?.status === 401,
 *   onRefreshFailed: () => window.location.href = '/login',
 * }));
 * ```
 */
export const authPlugin = (options: AuthPluginOptions): ApiPlugin => {
  const {
    getToken,
    refreshToken,
    shouldRefresh,
    onRefreshFailed,
    headerKey = 'Authorization',
    tokenPrefix = 'Bearer',
  } = options;

  // Refresh state
  let isRefreshing = false;
  let refreshQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
  }> = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    refreshQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(token!);
      }
    });
    refreshQueue = [];
  };

  return {
    name: 'auth',

    // Attach token to every request
    onRequest: (ctx: RequestContext) => {
      const token = getToken();
      if (token) {
        ctx.config.headers = {
          ...ctx.config.headers,
          [headerKey]: `${tokenPrefix} ${token}`,
        };
      }
      return ctx;
    },

    // Install refresh interceptor
    install: (instance: AxiosInstance) => {
      instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
          };

          if (!shouldRefresh(error) || originalRequest._retry) {
            return Promise.reject(error);
          }

          // Queue concurrent requests while refreshing
          if (isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              refreshQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers[headerKey] = `${tokenPrefix} ${token}`;
              return instance(originalRequest);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const newToken = await refreshToken();
            processQueue(null, newToken);

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers[headerKey] = `${tokenPrefix} ${newToken}`;

            return instance(originalRequest);
          } catch (err) {
            processQueue(err, null);
            onRefreshFailed?.(err);
            return Promise.reject(err);
          } finally {
            isRefreshing = false;
          }
        }
      );
    },
  };
};
