/* eslint-disable @typescript-eslint/no-explicit-any */
export type EventHandler<T = any> = (data?: T) => void;

/**
 * Simple EventBus pattern for decoupled communication.
 * Supports strongly typed events via Generics or loose typing.
 */
export class EventBus<
  Events extends Record<string, any> = Record<string, any>,
> {
  private events: Map<keyof Events, EventHandler[]> = new Map();

  /**
   * Subscribe to an event.
   * @param event - Name of the event to listen to.
   * @param handler - Function to be called when event is emitted.
   * @returns Unsubscribe function.
   */
  on<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(handler as EventHandler);
    return () => this.off(event, handler);
  }

  /**
   * Subscribe to an event only once.
   * @param event - Name of the event.
   * @param handler - Function to be called.
   * @returns Unsubscribe function.
   */
  once<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): () => void {
    const onceHandler: EventHandler<Events[K]> = (data) => {
      handler(data);
      this.off(event, onceHandler);
    };
    return this.on(event, onceHandler);
  }

  /**
   * Unsubscribe from an event.
   * @param event - Name of the event.
   * @param handler - Reference to the handler function to remove.
   */
  off<K extends keyof Events>(
    event: K,
    handler: EventHandler<Events[K]>
  ): void {
    if (!this.events.has(event)) return;
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler as EventHandler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  /**
   * Emit an event to all subscribers.
   * Handlers are called safely; if one throws, others still run.
   * @param event - Name of the event.
   * @param data - Data to pass to subscribers (optional).
   */
  emit<K extends keyof Events>(event: K, data?: Events[K]): void {
    const handlers = this.events.get(event);
    if (!handlers) return;

    // Copy to avoid issues if handlers unsubscribe during emit
    [...handlers].forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error handling event "${String(event)}":`, error);
      }
    });
  }

  /**
   * Check if an event has any subscribers.
   * @param event - Name of the event.
   * @returns True if at least one subscriber exists.
   */
  has<K extends keyof Events>(event: K): boolean {
    return (this.events.get(event)?.length || 0) > 0;
  }

  /**
   * Get the number of subscribers for an event.
   * @param event - Name of the event.
   * @returns Number of subscribers.
   */
  count<K extends keyof Events>(event: K): number {
    return this.events.get(event)?.length || 0;
  }

  /**
   * Clear all listeners for a specific event or all events.
   * @param event - Optional event name to clear. If omitted, clears all events.
   */
  clear<K extends keyof Events>(event?: K): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

const eventBus = new EventBus();
export default eventBus;
