import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig as IDefaultAxiosRequestConfig,
} from 'axios';
import { BaseRequestMethod } from './constants';
import { IErrorMapper } from './error';
import { IMapper } from './mapper';
import { AxiosRequestConfig, BaseResponse, responseDefault } from './types';

type IFallbackFn = (
  r: AxiosResponse<BaseResponse<null>>,
  error: Error,
  opts: Pick<AxiosRequestConfig, 'disabledToast' | 'disabledAuthRequired'>
) => void;

export abstract class BaseRequest {
  public axiosInstance: AxiosInstance;
  public baseURL: string;
  public mapper: IMapper;
  public errorMapper: IErrorMapper;
  public headers: () => AxiosRequestConfig['headers'];
  public fallbackError: IFallbackFn;

  constructor({
    baseURL,
    mapper,
    error,
    headers,
    fallbackError,
  }: {
    baseURL: string;
    mapper: IMapper;
    error: IErrorMapper;
    headers: () => AxiosRequestConfig['headers'];
    fallbackError: IFallbackFn;
  }) {
    this.baseURL = baseURL;
    this.mapper = mapper;
    this.errorMapper = error;
    this.headers = headers;
    this.fallbackError = fallbackError;

    this.axiosInstance = axios.create({
      timeout: 30000,
      baseURL,
    });
  }

  private get AxiosCancelToken() {
    return axios.CancelToken.source();
  }

  public async get<T = any>(
    url: string,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    return this.request(url, BaseRequestMethod.GET, payload, config);
  }

  public post<T = any>(
    url: string,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    return this.request(url, BaseRequestMethod.POST, payload, config);
  }

  public delete<T = any>(
    url: string,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    return this.request(url, BaseRequestMethod.DELETE, payload, config);
  }

  public patch<T = any>(
    url: string,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    return this.request(url, BaseRequestMethod.PATCH, payload, config);
  }

  public async put<T = any>(
    url: string,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    return this.request(url, BaseRequestMethod.PUT, payload, config);
  }

  public async request<T = any>(
    url: string,
    method: BaseRequestMethod,
    payload: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): Promise<BaseResponse<T>> {
    try {
      if (!this.baseURL) throw new Error("The API URL doesn't set up.");

      const {
        errorMapper,
        mapperKey = '',
        headers: headersProps = {},
        ...axiosConfig
      } = config;

      // Ensure headers is a function before calling
      const headers = this.headers ? this.headers() : {};

      // Get the mapper function if available
      const mapper = this.mapper.getMapper
        ? this.mapper.getMapper(mapperKey || url)
        : undefined;

      const _config = this.buildConfig(url, mapper, {
        cancelToken: this.AxiosCancelToken.token,
        headers: { ...headers, ...headersProps },
        ...axiosConfig,
      });
      const result: AxiosResponse<BaseResponse<T>> = await this.callRequest(
        url,
        method,
        _config,
        payload
      );

      return result.data;
    } catch (error: Error | any) {
      return {
        ...responseDefault,
        message: error?.message,
      } as BaseResponse<T>;
    }
  }

  private async callRequest(
    url: string,
    method: BaseRequestMethod = BaseRequestMethod.GET,
    config: AxiosRequestConfig,
    payload: Record<string, any>
  ) {
    let body: IDefaultAxiosRequestConfig = {}; // use IDefault expecting standard axios props

    if (method === BaseRequestMethod.GET) {
      body = { params: payload };
    } else {
      body = { data: payload };
    }

    const result = await this.axiosInstance({
      url,
      method,
      ...body,
      ...config,
    });
    return result;
  }

  private buildConfig(
    _url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapper: any | undefined,
    config: AxiosRequestConfig
  ): AxiosRequestConfig {
    let _config: AxiosRequestConfig = {
      baseURL: this.baseURL,
      ...config,
      validateStatus: () => true,
    };

    if (mapper) {
      _config = {
        ..._config,
        transformResponse: [
          ...(axios.defaults.transformResponse as any[]),
          mapper,
        ],
      };
    }

    return _config;
  }
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: any) => void;
  }> = [];

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token!);
      }
    });

    this.failedQueue = [];
  }

  public configureAuth(options: {
    refreshToken: () => Promise<string>;
    addToHeader?: (
      config: AxiosRequestConfig,
      token: string
    ) => AxiosRequestConfig;
    shouldRetry: (error: AxiosError) => boolean;
  }) {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as IDefaultAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (options.shouldRetry(error) && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (options.addToHeader) {
                  return this.axiosInstance(
                    options.addToHeader(originalRequest, token)
                  );
                }
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers['Authorization'] = 'Bearer ' + token;
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const newToken = await options.refreshToken();
            this.processQueue(null, newToken);

            if (options.addToHeader) {
              return this.axiosInstance(
                options.addToHeader(originalRequest, newToken)
              );
            }

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;

            return this.axiosInstance(originalRequest);
          } catch (err) {
            this.processQueue(err, null);
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }
}
