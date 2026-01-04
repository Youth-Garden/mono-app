import { EventBus } from '@repo/core/events';

// Widget-specific event types
type WidgetEvents = {
  'chat:open': void;
  'chat:close': void;
  'chat:toggle': void;
  'chat:toggleTheme': void;
  'message:sent': { id: string; text: string; timestamp: Date };
  'config:updated': unknown;
};

const eventBus = new EventBus<WidgetEvents>();

export default eventBus;
