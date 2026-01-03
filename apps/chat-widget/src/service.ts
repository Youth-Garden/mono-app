import { appConfig } from './configs/app-config';
import eventBus from './configs/event-bus';
import {
  addMessage,
  setConversationId,
  setOpen,
  setTyping,
  toggleTheme,
  updateMessageStatus,
} from './store';
import { Message } from './types';

class ChatService {
  constructor() {
    this.initBusListeners();
  }

  private initBusListeners() {
    eventBus.on('chat:open', () => setOpen(true));
    eventBus.on('chat:close', () => setOpen(false));
    eventBus.on('chat:toggleTheme', () => toggleTheme());
    eventBus.on('chat:toggle', () => {
      // We can't easily access current state value here without importing the signal directly
      // Better to rely on the UI to toggle or check the signal value carefully.
      // For now, let's just trigger an open if we don't know the state, or use a callback from the store if exposed.
      // Ideally, the event bus should be handled by a controller that knows the state.
    });
  }

  // Generate a unique ID (simple UUID mostly)
  private generateId() {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  private getVisitorId(): string {
    let id = localStorage.getItem('spectre_visitor_id');
    if (!id) {
      id = this.generateId();
      localStorage.setItem('spectre_visitor_id', id);
    }
    return id;
  }

  public toggleChat(currentState: boolean) {
    setOpen(!currentState);
  }

  public async sendMessage(text: string) {
    if (!text.trim()) return;

    const projectId = appConfig.projectId;
    if (!projectId) {
      console.error('[Spectre] No Project ID found.');
      return;
    }

    const tempId = this.generateId();
    const userMsg: Message = {
      id: tempId,
      text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    addMessage(userMsg);
    setTyping(true);

    eventBus.emit('message:sent', {
      id: userMsg.id,
      text: userMsg.text,
      timestamp: userMsg.timestamp,
    });

    try {
      const response = await fetch(`${appConfig.apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-project-id': projectId,
        },
        body: JSON.stringify({
          content: text,
          visitorId: this.getVisitorId(),
        }),
      });

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();

      updateMessageStatus(tempId, 'sent');

      if (data.conversation?.id) {
        setConversationId(data.conversation.id);
      }

      if (data.botResponse) {
        const botMsg: Message = {
          id: data.botResponse.id,
          text: data.botResponse.content,
          sender: 'bot',
          timestamp: new Date(data.botResponse.createdAt),
          status: 'sent',
        };
        addMessage(botMsg);
        eventBus.emit('message:received', botMsg);
      }
    } catch (error) {
      console.error('[Spectre] Send Failed:', error);
      updateMessageStatus(tempId, 'error');

      const errorMsg: Message = {
        id: this.generateId(),
        text: 'Failed to send message. Please try again.',
        sender: 'system', // Differentiate system errors
        timestamp: new Date(),
        status: 'sent',
      };
      addMessage(errorMsg);
    } finally {
      setTyping(false);
    }
  }
}

export const chatService = new ChatService();
