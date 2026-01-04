// Chat domain types
export type MessageKey = string;

export type SenderType = 'user' | 'bot' | 'system';

export interface Message {
  id: MessageKey;
  text: string;
  sender: SenderType;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

export interface ChatState {
  isOpen: boolean;
  isTyping: boolean;
  conversationId: string | null;
  messages: Message[];
  unreadCount: number;
  theme: 'light' | 'dark';
}
