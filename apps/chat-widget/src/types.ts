// --- Domain Entities ---

export type MessageKey = string;

export type SenderType = 'user' | 'bot' | 'system';

export interface Message {
  id: MessageKey;
  text: string;
  sender: SenderType;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

// --- Store State ---

export interface ChatState {
  isOpen: boolean;
  isTyping: boolean;
  conversationId: string | null;
  messages: Message[];
  unreadCount: number;
  theme: 'light' | 'dark';
}

// --- API / External Contract ---

export interface MessageEventData {
  id: string;
  text: string;
  timestamp: Date;
}

export interface SpectreConfig {
  projectId: string;
  apiUrl?: string;
  themeColor?: string;
  userEmail?: string;
  metadata?: Record<string, any>;
}

export interface SpectreAPI {
  open: () => void;
  close: () => void;
  toggle: () => void;
  toggleTheme: () => void;
  onOpen: (cb: () => void) => void;
  onClose: (cb: () => void) => void;
  onMessageSent: (cb: (data: MessageEventData) => void) => void;
  init: (config: SpectreConfig) => void;
}
