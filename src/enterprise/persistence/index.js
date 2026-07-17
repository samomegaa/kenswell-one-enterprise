const { PersistenceAdapter } = require('./persistence-adapter');
const { PersistenceRegistry } = require('./persistence-registry');
const { PersistenceQuery } = require('./persistence-query');
const { PersistenceResult } = require('./persistence-result');
const { PersistenceTransaction } = require('./persistence-transaction');
const { PersistenceAdapterFactory } = require('./adapter-factory');
const { MemoryPersistenceAdapter } = require('./adapters/memory-adapter');
const errors = require('./persistence-errors');

const persistenceRegistry = new PersistenceRegistry();
const persistenceAdapterFactory = new PersistenceAdapterFactory();
persistenceAdapterFactory.register('memory', (options) => new MemoryPersistenceAdapter(options));

module.exports = {
  PersistenceAdapter,
  PersistenceRegistry,
  PersistenceQuery,
  PersistenceResult,
  PersistenceTransaction,
  PersistenceAdapterFactory,
  MemoryPersistenceAdapter,
  persistenceRegistry,
  persistenceAdapterFactory,
  ...errors,
};
