const { Query } = require('./query');
const { QueryNotFoundError } = require('./cqrs-errors');

class QueryBus {
  constructor() {
    this.queries = new Map();
  }

  register(name, handler) {
    const query = handler instanceof Query
      ? handler
      : new Query(name, handler);

    this.queries.set(query.name, query);
    return query;
  }

  has(queryName) {
    return this.queries.has(queryName);
  }

  get(queryName) {
    const query = this.queries.get(queryName);

    if (!query) {
      throw new QueryNotFoundError(queryName);
    }

    return query;
  }

  list() {
    return Array.from(this.queries.keys());
  }

  async execute(queryName, context = {}) {
    const query = this.get(queryName);
    return query.execute(context);
  }

  clear() {
    this.queries.clear();
  }
}

const defaultQueryBus = new QueryBus();

module.exports = {
  QueryBus,
  defaultQueryBus,
};
