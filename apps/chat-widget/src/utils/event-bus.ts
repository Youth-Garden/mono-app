import { AppEvents } from './event';

export type EventKey = keyof AppEvents;
export type EventHandler<T = any> = (data: T) => void;

class EventBus {
  private events: Map<EventKey, EventHandler[]> = new Map();

  on<K extends EventKey>(
    event: K,
    handler: EventHandler<AppEvents[K]>
  ): () => void {
    if (!this.events.has(event)) this.events.set(event, []);
    this.events.get(event)!.push(handler as EventHandler);
    return () => this.off(event, handler);
  }

  once<K extends EventKey>(
    event: K,
    handler: EventHandler<AppEvents[K]>
  ): () => void {
    const onceHandler: EventHandler<AppEvents[K]> = (data) => {
      handler(data);
      this.off(event, onceHandler);
    };
    return this.on(event, onceHandler);
  }

  off<K extends EventKey>(
    event: K,
    handler?: EventHandler<AppEvents[K]>
  ): void {
    if (!this.events.has(event)) return;
    const handlers = this.events.get(event)!;
    if (!handler) {
      this.events.delete(event);
    } else {
      const index = handlers.indexOf(handler as EventHandler);
      if (index > -1) handlers.splice(index, 1);
    }
  }

  emit<K extends EventKey>(event: K, data?: AppEvents[K]): void {
    if (!this.events.has(event)) return;
    [...this.events.get(event)!].forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for "${event}":`, error);
      }
    });
  }
}

export const eventBus = new EventBus();
export * from './event';
export default eventBus;
