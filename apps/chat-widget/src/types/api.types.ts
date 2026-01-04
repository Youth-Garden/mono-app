// Public API types

export interface MessageEventData {
  id: string;
  text: string;
  timestamp: Date;
}

export interface SpectreAPI {
  open: () => void;
  close: () => void;
  toggle: () => void;
  toggleTheme: () => void;
  onOpen: (cb: () => void) => void;
  onClose: (cb: () => void) => void;
  onMessageSent: (cb: (data: MessageEventData) => void) => void;
  init: (config: import('./config.types').SpectreConfig) => void;
}

// Extend Window interface
declare global {
  interface Window {
    spectre: SpectreAPI;
  }
}
