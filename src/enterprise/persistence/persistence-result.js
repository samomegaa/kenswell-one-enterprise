class PersistenceResult {
  constructor({ items = [], count, offset = 0, limit = null, duration = 0, metadata = {} } = {}) {
    const frozenItems = Object.freeze([...items]);
    this.items = frozenItems;
    this.count = count ?? frozenItems.length;
    this.offset = offset;
    this.limit = limit;
    this.hasMore = limit !== null && offset + frozenItems.length < this.count;
    this.duration = duration;
    this.metadata = Object.freeze({ ...metadata });
    Object.freeze(this);
  }

  static empty(query = {}) {
    return new PersistenceResult({ items: [], count: 0, offset: query.offset || 0, limit: query.limit ?? null });
  }
}

module.exports = { PersistenceResult };
