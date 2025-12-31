// ... imports same as before ... using replace entire file for clarity or just class body
import { BaseRequest } from '@repo/core';
import { toast } from '@repo/ui';
import axios from 'axios';
import { ApiStatusCode, ApiStatusNumber } from '../shared/constants';
import { BASE_API, RouteConfig } from '../shared/constants/server';
import { mapper } from '../shared/mappers';
import { errorMapper } from '../shared/mappers/error';

export class CoreRequest extends BaseRequest {
  constructor() {
    super({
      baseURL: BASE_API,
      mapper: mapper,
      error: errorMapper,
      headers: () => {
        const token = localStorage.getItem('jwta');
        return {
          Authorization: token ? `Bearer ${token}` : '',
        };
      },
      fallbackError: (
        result,
        error: Error,
        { disabledAuthRequired, disabledToast } = {
          disabledToast: false,
          disabledAuthRequired: false,
        }
      ) => {
        // Handling 401 redirect if needed (though Interceptor handles retry)
        // If interceptor fails (refresh token invalid), it might eventually throw or return error.
        if (
          !disabledAuthRequired &&
          result?.data?.code === ApiStatusCode.ErrorAuth
        ) {
          window.location.href = RouteConfig.Login;
        }

        if (!disabledToast) {
          toast.error(result?.data?.message || 'Error');
        }
      },
    });

    this.configureAuth({
      shouldRetry: (error) =>
        error.response?.status === ApiStatusNumber.ErrorAuth,
      refreshToken: async () => {
        const refreshToken = localStorage.getItem('refresh_token');

        try {
          // Using a fresh axios instance to avoid infinite interceptor loops
          const { data } = await axios.post(`${BASE_API}/auth/refresh`, {
            refreshToken,
          });

          const newToken = data.data.accessToken;

          localStorage.setItem('jwta', newToken);

          return newToken;
        } catch (err) {
          localStorage.removeItem('jwta');
          // Optional: Clear refresh token as well
          // localStorage.removeItem('refresh_token');
          window.location.href = RouteConfig.Login;
          throw err;
        }
      },
    });
  }
}
