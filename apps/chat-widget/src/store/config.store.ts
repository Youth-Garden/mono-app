import { computed, signal } from '@preact/signals';
import {
  ResolvedConfig,
  SpectreConfig,
  WidgetBranding,
  WidgetColors,
} from '../types';

// --- Default Values ---

const DEFAULT_BRANDING: Required<WidgetBranding> = {
  logo: '',
  title: 'Chat with us!',
  subtitle: 'We reply immediately',
  poweredBy: 'Spectre',
  showPoweredBy: true,
};

const DEFAULT_COLORS: Required<WidgetColors> = {
  primary: '',
  primaryForeground: '',
};

// --- Config State ---

const initialConfig: ResolvedConfig = {
  projectId: '',
  apiUrl: '',
  mode: 'floating',
  container: null,
  branding: DEFAULT_BRANDING,
  colors: DEFAULT_COLORS,
  userEmail: '',
  metadata: {},
};

const _config = signal<ResolvedConfig>(initialConfig);

// --- Computed / Selectors ---

export const widgetConfig = computed(() => _config.value);
export const branding = computed(() => _config.value.branding);
export const colors = computed(() => _config.value.colors);
export const widgetMode = computed(() => _config.value.mode);
export const containerSelector = computed(() => _config.value.container);
export const isEmbedded = computed(() => _config.value.mode === 'embedded');

// --- Actions ---

export const setConfig = (config: SpectreConfig) => {
  _config.value = {
    projectId: config.projectId,
    apiUrl: config.apiUrl || '',
    mode: config.mode || 'floating',
    container: config.container || null,
    branding: {
      ...DEFAULT_BRANDING,
      ...config.branding,
    },
    colors: {
      ...DEFAULT_COLORS,
      ...config.colors,
    },
    userEmail: config.userEmail || '',
    metadata: config.metadata || {},
  };
};

export const resetConfigStore = () => {
  _config.value = initialConfig;
};
