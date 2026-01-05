import { eventBus } from '../lib';
import { generateId } from '../lib/utils';
import {
  addMessage,
  isOpen,
  setConversationId,
  setOpen,
  setTyping,
  toggleTheme,
  updateMessageStatus,
  widgetConfig,
} from '../store';
import { Message } from '../types';

class ChatService {
  constructor() {
    this.initBusListeners();
  }

  private initBusListeners() {
    eventBus.on('chat:open', () => setOpen(true));
    eventBus.on('chat:close', () => setOpen(false));
    eventBus.on('chat:toggleTheme', () => toggleTheme());
  }

  private getVisitorId(): string {
    let id = localStorage.getItem('spectre_visitor_id');
    if (!id) {
      id = generateId();
      localStorage.setItem('spectre_visitor_id', id);
    }
    return id;
  }

  public toggleChat() {
    setOpen(!isOpen.value);
  }

  public async sendMessage(
    text: string,
    attachments?: { file: File; preview: string }[]
  ) {
    if (!text.trim() && (!attachments || attachments.length === 0)) return;

    const config = widgetConfig.value;
    if (!config.projectId) {
      console.error('[Spectre] No Project ID found.');
      return;
    }
    if (!config.apiUrl) {
      console.error('[Spectre] No API URL specified.');
      return;
    }

    const tempId = generateId();
    const userMsg: Message = {
      id: tempId,
      text,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      attachments,
    };

    addMessage(userMsg);
    setTyping(true);

    eventBus.emit('message:sent', {
      id: userMsg.id,
      text: userMsg.text,
      timestamp: userMsg.timestamp,
    });

    try {
      const response = await fetch(`${config.apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-project-id': config.projectId,
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
      }
    } catch (error) {
      console.error('[Spectre] Send Failed:', error);
      updateMessageStatus(tempId, 'error');

      const errorMsg: Message = {
        id: generateId(),
        text: 'Failed to send message. Please try again.',
        sender: 'system',
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
