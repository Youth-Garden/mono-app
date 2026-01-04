import { computed, signal } from '@preact/signals';
import { ChatState, Message } from '../types';

// Helper to get initial theme
const getInitialTheme = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem('spectre_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return 'light';
  } catch {
    return 'light';
  }
};

// Initial State
const initialState: ChatState = {
  isOpen: false,
  isTyping: false,
  conversationId: null,
  messages: [
    {
      id: 'welcome-1',
      text: 'Hello. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
      status: 'sent',
    },
  ],
  unreadCount: 0,
  theme: getInitialTheme(),
};

// --- Signals ---
const _state = signal<ChatState>(initialState);

// --- Computed / Selectors ---
export const isOpen = computed(() => _state.value.isOpen);
export const isTyping = computed(() => _state.value.isTyping);
export const messages = computed(() => _state.value.messages);
export const conversationId = computed(() => _state.value.conversationId);
export const unreadCount = computed(() => _state.value.unreadCount);
export const theme = computed(() => _state.value.theme);

// --- Actions ---

export const setOpen = (open: boolean) => {
  _state.value = { ..._state.value, isOpen: open };
  if (open) {
    _state.value = { ..._state.value, unreadCount: 0 };
  }
};

export const setTyping = (typing: boolean) => {
  _state.value = { ..._state.value, isTyping: typing };
};

export const addMessage = (message: Message) => {
  _state.value = {
    ..._state.value,
    messages: [..._state.value.messages, message],
    unreadCount: _state.value.isOpen ? 0 : _state.value.unreadCount + 1,
  };
};

export const updateMessageStatus = (id: string, status: Message['status']) => {
  _state.value = {
    ..._state.value,
    messages: _state.value.messages.map((msg) =>
      msg.id === id ? { ...msg, status } : msg
    ),
  };
};

export const setConversationId = (id: string) => {
  _state.value = { ..._state.value, conversationId: id };
};

export const toggleTheme = () => {
  const newTheme = _state.value.theme === 'light' ? 'dark' : 'light';
  _state.value = {
    ..._state.value,
    theme: newTheme,
  };
  localStorage.setItem('spectre_theme', newTheme);
};

export const resetChatStore = () => {
  _state.value = initialState;
};
