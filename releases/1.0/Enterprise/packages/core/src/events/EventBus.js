class EventBus {
  constructor({ logger } = {}) {
    this.logger = logger || null;
    this.subscribers = new Map();
    this.history = [];
  }

  subscribe(eventName, handler) {
    if (!eventName) {
      throw new Error('Event name is required');
    }

    if (typeof handler !== 'function') {
      throw new Error('Event handler must be a function');
    }

    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, new Set());
    }

    this.subscribers.get(eventName).add(handler);

    return () => this.unsubscribe(eventName, handler);
  }

  unsubscribe(eventName, handler) {
    if (!this.subscribers.has(eventName)) {
      return false;
    }

    return this.subscribers.get(eventName).delete(handler);
  }

  async publish(eventName, payload = {}, metadata = {}) {
    if (!eventName) {
      throw new Error('Event name is required');
    }

    const event = {
      id: metadata.id || `${eventName}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: eventName,
      payload,
      metadata: {
        source: metadata.source || 'enterprise',
        correlationId: metadata.correlationId || null,
        tenantId: metadata.tenantId || null,
        actorId: metadata.actorId || null,
        timestamp: new Date().toISOString(),
      },
    };

    this.history.push(event);

    const handlers = Array.from(this.subscribers.get(eventName) || []);

    for (const handler of handlers) {
      await handler(event);
    }

    if (this.logger && typeof this.logger.info === 'function') {
      this.logger.info('enterprise_event_published', {
        event: event.name,
        handlers: handlers.length,
        correlationId: event.metadata.correlationId,
      });
    }

    return event;
  }

  subscriberCount(eventName) {
    return (this.subscribers.get(eventName) || new Set()).size;
  }

  eventHistory() {
    return [...this.history];
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = EventBus;
