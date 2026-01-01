export type AppConfig = {
  env: {
    type: 'development' | 'production';
    isDevelopment: boolean;
    isProduction: boolean;
  };
  api: {
    port: number;
    globalPrefix: string;
  };
  db: {
    url: string;
  };
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
    jwtRefreshSecret: string;
    jwtRefreshExpiresIn: string;
  };
  rateLimit: {
    ttlMs: number;
    max: number;
  };
};
