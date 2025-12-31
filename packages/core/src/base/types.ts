import { AxiosRequestConfig as IDefaultAxiosRequestConfig } from 'axios';

import { IErrorMapper } from './error';

export const responseDefault = {
  code: 100,
  data: null,
  message: '',
};

export interface BaseResponse<T = any> {
  code: number;
  statusCode?: number;
  message?: string;
  data: T;
  errors?: Record<string, string>;
}

export type AxiosRequestConfig = IDefaultAxiosRequestConfig & {
  authRequest?: boolean;
  errorMapper?: IErrorMapper;
  mapperKey?: string;
  disabledToast?: boolean;
  disabledAuthRequired?: boolean;
};
