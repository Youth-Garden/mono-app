export type MessageKey = string;

export type SenderType = 'user' | 'bot' | 'system';

export interface MessageAttachment {
  file: File;
  preview: string;
}

export interface Message {
  id: MessageKey;
  text: string;
  sender: SenderType;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
  attachments?: MessageAttachment[];
}

export interface ChatState {
  isOpen: boolean;
  isTyping: boolean;
  conversationId: string | null;
  messages: Message[];
  unreadCount: number;
  theme: 'light' | 'dark';
}
