import { signal } from '@preact/signals';

export interface AppConfigState {
  projectId: string | null;
  apiUrl: string;
  themeColor?: string;
}

const DEFAULT_API_URL = 'https://api.spectre.com/v1'; // Default SaaS URL

class AppConfig {
  // Use signals for reactive updates if needed, though config usually static after init
  private config = signal<AppConfigState>({
    projectId: null,
    apiUrl: DEFAULT_API_URL,
  });

  get value() {
    return this.config.value;
  }

  init(config: Partial<AppConfigState>) {
    console.log('[Spectre] Initializing with config:', config);
    this.config.value = {
      ...this.config.value,
      ...config,
      // Ensure apiUrl doesn't have trailing slash for consistency
      apiUrl: config.apiUrl
        ? config.apiUrl.replace(/\/$/, '')
        : this.config.value.apiUrl,
    };
  }

  get projectId() {
    return this.config.value.projectId;
  }

  get apiUrl() {
    return this.config.value.apiUrl;
  }
}

export const appConfig = new AppConfig();
