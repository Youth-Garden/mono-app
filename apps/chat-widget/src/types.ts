export interface MessageEventData {
  id: string;
  text: string;
  timestamp: Date;
}

export interface SpectreConfig {
  theme?: string;
  userEmail?: string;
  [key: string]: any;
}

export interface SpectreAPI {
  open: () => void;
  close: () => void;
  toggle: () => void;
  onOpen: (cb: () => void) => void;
  onClose: (cb: () => void) => void;
  onMessageSent: (cb: (data: MessageEventData) => void) => void;
  init: (config: SpectreConfig) => void;
}
