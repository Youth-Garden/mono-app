export enum RouteConfig {
  Login = '/login',
}

export const BASE_API =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
