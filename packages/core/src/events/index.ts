/**
 * StoreFuse Event System
 * 
 * From README: "Event bus" - part of core responsibilities
 */

type EventHandler = (...args: any[]) => void | Promise<void>;

/**
 * Simple Event Bus
 */
export class EventBus {
  private events: Map<string, Set<EventHandler>> = new Map();

  /**
   * Register event listener
   */
  on(event: string, handler: EventHandler): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler);
  }

  /**
   * Remove event listener
   */
  off(event: string, handler: EventHandler): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.delete(handler);
    }
  }

  /**
   * Emit event
   */
  async emit(event: string, ...args: any[]): Promise<void> {
    const handlers = this.events.get(event);
    if (!handlers) return;

    const promises = Array.from(handlers).map((handler) =>
      Promise.resolve(handler(...args))
    );

    await Promise.all(promises);
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.events.clear();
  }
}

/**
 * Core Events (From README - can be extended by modules)
 */
export const CoreEvents = {
  INIT: "storefuse:init",
  CONFIG_LOADED: "storefuse:config:loaded",
  ADAPTER_READY: "storefuse:adapter:ready",
  MODULE_LOADED: "storefuse:module:loaded",
  THEME_LOADED: "storefuse:theme:loaded",
  REQUEST_START: "storefuse:request:start",
  REQUEST_END: "storefuse:request:end",
} as const;
