import { useEffect } from 'react';
import eventBus, { EventHandler } from '../events/event-bus';

/**
 * React hook to subscribe to an EventBus.
 * Automatically handles subscription and cleanup on unmount.
 *
 * @param bus - The EventBus instance to subscribe to.
 * @param event - The event name.
 * @param handler - The handler function.
 */
export function useEvent<
  Events extends Record<string, any>,
  K extends keyof Events,
>(event: K, handler: EventHandler<Events[K]>) {
  useEffect(() => {
    const unsubscribe = eventBus.on(event as string, handler);

    return () => unsubscribe();
  }, [event, handler]);
}
