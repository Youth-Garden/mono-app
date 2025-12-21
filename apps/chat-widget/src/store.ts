import { signal } from '@preact/signals';
import { eventBus } from './utils/eventBus'; // Import the bus

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// --- SIGNALS ---
export const isOpen = signal(false);
export const isTyping = signal(false);
// TODO: Remove this mock initial message when connecting to real backend
export const messages = signal<Message[]>([
  {
    id: 'welcome-1',
    text: 'Hello. How can I assist you today?',
    sender: 'bot',
    timestamp: new Date(),
  },
]);

// --- INITIALIZE LISTENERS ---
// This ensures external events drive internal state
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

// Call immediately to bind
initBusListeners();

// --- ACTIONS ---

const generateId = () => Math.random().toString(36).substr(2, 9);

// We now emit events instead of just changing values, allowing the bus to intercept
export const toggleChat = () => eventBus.emit('chat:toggle');
export const openChat = () => eventBus.emit('chat:open');
export const closeChat = () => eventBus.emit('chat:close');

export const sendMessage = (text: string) => {
  if (!text.trim()) return;

  const userMsg: Message = {
    id: generateId(),
    text: text,
    sender: 'user',
    timestamp: new Date(),
  };

  messages.value = [...messages.value, userMsg];

  // EMIT: Notify the system that a message was sent
  eventBus.emit('message:sent', {
    id: userMsg.id,
    text: userMsg.text,
    timestamp: userMsg.timestamp,
  });

  isTyping.value = true;

  // TODO: Remove this mock reply logic when connecting to real backend
  setTimeout(() => {
    isTyping.value = false;
    const botReplies = [
      'Acknowledged.',
      'Processing Request.',
      'Data Received.',
    ];
    const replyText = botReplies[Math.floor(Math.random() * botReplies.length)];

    const botMsg: Message = {
      id: generateId(),
      text: replyText,
      sender: 'bot',
      timestamp: new Date(),
    };

    messages.value = [...messages.value, botMsg];

    // EMIT: Notify system of received message
    eventBus.emit('message:received', {
      id: botMsg.id,
      text: botMsg.text,
      timestamp: botMsg.timestamp,
    });
  }, 1500);
};
