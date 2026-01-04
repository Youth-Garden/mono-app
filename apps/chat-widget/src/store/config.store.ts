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

  // Apply custom colors to CSS variables after mount
  requestAnimationFrame(() => {
    applyColorsToCSS(_config.value.colors);
  });
};

/**
 * Inject custom colors as CSS variables into the Shadow DOM
 */
export const applyColorsToCSS = (customColors: Required<WidgetColors>) => {
  const root = document.querySelector('#spectre-chat-host')?.shadowRoot;
  if (!root) return;

  const themeEl = root.querySelector('.spectre-theme') as HTMLElement;
  if (!themeEl) return;

  if (customColors.primary) {
    const rgb = hexToRgb(customColors.primary);
    if (rgb) {
      themeEl.style.setProperty('--chat-primary', `${rgb.r} ${rgb.g} ${rgb.b}`);
    }
  }

  if (customColors.primaryForeground) {
    const rgb = hexToRgb(customColors.primaryForeground);
    if (rgb) {
      themeEl.style.setProperty(
        '--chat-primary-foreground',
        `${rgb.r} ${rgb.g} ${rgb.b}`
      );
    }
  }
};

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace(/^#/, '');
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export const resetConfigStore = () => {
  _config.value = initialConfig;
};
