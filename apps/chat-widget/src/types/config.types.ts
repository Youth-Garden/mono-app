// Widget configuration types

export interface WidgetBranding {
  logo?: string; // URL or data:uri
  title?: string; // "Chat with us!"
  subtitle?: string; // "We reply immediately"
  poweredBy?: string; // "Spectre"
  showPoweredBy?: boolean;
}

export interface WidgetColors {
  primary?: string; // Brand color (header, buttons)
  primaryForeground?: string; // Text on primary
}

export type WidgetMode = 'floating' | 'embedded';

export interface SpectreConfig {
  projectId: string;
  apiUrl?: string;
  // Widget mode
  mode?: WidgetMode;
  container?: string; // CSS selector for embedded mode
  // Customization
  branding?: WidgetBranding;
  colors?: WidgetColors;
  // User context
  userEmail?: string;
  metadata?: Record<string, any>;
}

// Internal resolved config (all values guaranteed)
export interface ResolvedConfig {
  projectId: string;
  apiUrl: string;
  mode: WidgetMode;
  container: string | null;
  branding: Required<WidgetBranding>;
  colors: Required<WidgetColors>;
  userEmail: string;
  metadata: Record<string, any>;
}
