import { BaseRequest, authPlugin } from '@repo/core';
import axios from 'axios';
import { RouteConfig } from '../shared/constants/routes';
import { ApiEndpoint, ServerConfig } from '../shared/constants/server';
import { mapper } from '../shared/mappers';

export class CoreRequest extends BaseRequest {
  constructor() {
    super({
      baseURL: ServerConfig.Main,
      mapper: mapper,
    });

    // Plugin-based auth with automatic token refresh
    this.use(
      authPlugin({
        getToken: () => localStorage.getItem('jwta'),
        refreshToken: async () => {
          const refreshToken = localStorage.getItem('refresh_token');

          try {
            const { data } = await axios.post(
              `${ServerConfig.Main}${ApiEndpoint.AuthRefresh}`,
              { refreshToken }
            );

            const newToken = data.data.accessToken;
            localStorage.setItem('jwta', newToken);

            return newToken;
          } catch (err) {
            localStorage.removeItem('jwta');
            throw err;
          }
        },
        shouldRefresh: (error) => error.response?.status === 401,
        onRefreshFailed: () => {
          window.location.href = RouteConfig.Login;
        },
      })
    );
  }
}
