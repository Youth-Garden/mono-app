import { signal } from '@preact/signals';
import { appConfig } from './configs/app-config';
import eventBus from './configs/event-bus';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// --- SIGNALS ---
export const isOpen = signal(false);
export const isTyping = signal(false);
export const conversationId = signal<string | null>(null);
export const messages = signal<Message[]>([
  {
    id: 'welcome-1',
    text: 'Hello. How can I assist you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
]);

// Generate a unique visitor ID (persist in localStorage)
const getVisitorId = (): string => {
  let id = localStorage.getItem('spectre_visitor_id');
  if (!id) {
    id = Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    localStorage.setItem('spectre_visitor_id', id);
  }
  return id;
};

// --- INITIALIZE LISTENERS ---
const initBusListeners = () => {
  eventBus.on('chat:open', () => {
    isOpen.value = true;
  });
  eventBus.on('chat:close', () => {
    isOpen.value = false;
  });
  eventBus.on('chat:toggle', () => {
    isOpen.value = !isOpen.value;
  });
};

initBusListeners();

// --- ACTIONS ---

const generateId = () => Math.random().toString(36).substr(2, 9);

export const toggleChat = () => eventBus.emit('chat:toggle');
export const openChat = () => eventBus.emit('chat:open');
export const closeChat = () => eventBus.emit('chat:close');

export const sendMessage = async (text: string) => {
  if (!text.trim()) return;

  const projectId = appConfig.projectId;
  if (!projectId) {
    console.error('[Spectre] No Project ID found. Cannot send message.');
    return;
  }

  // Add user message optimistically
  const userMsg: Message = {
    id: generateId(),
    text: text,
    sender: 'user',
    timestamp: new Date(),
  };

  messages.value = [...messages.value, userMsg];

  eventBus.emit('message:sent', {
    id: userMsg.id,
    text: userMsg.text,
    timestamp: userMsg.timestamp,
  });

  isTyping.value = true;

  try {
    const response = await fetch(`${appConfig.apiUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-project-id': projectId,
      },
      body: JSON.stringify({
        content: text,
        visitorId: getVisitorId(),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Store conversation ID for future reference
    if (data.conversation?.id) {
      conversationId.value = data.conversation.id;
    }

    // Add bot response from server
    if (data.botResponse) {
      const botMsg: Message = {
        id: data.botResponse.id,
        text: data.botResponse.content,
        sender: 'bot',
        timestamp: new Date(data.botResponse.createdAt),
      };

      messages.value = [...messages.value, botMsg];

      eventBus.emit('message:received', {
        id: botMsg.id,
        text: botMsg.text,
        timestamp: botMsg.timestamp,
      });
    }
  } catch (error) {
    console.error('[Spectre] Failed to send message:', error);

    // Add error message
    const errorMsg: Message = {
      id: generateId(),
      text: 'Failed to send message. Please try again.',
      sender: 'bot',
      timestamp: new Date(),
    };

    messages.value = [...messages.value, errorMsg];
  } finally {
    isTyping.value = false;
  }
};
