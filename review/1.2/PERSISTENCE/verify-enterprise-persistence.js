#!/usr/bin/env node
const assert = require('assert');
const {
  PersistenceAdapter,
  PersistenceRegistry,
  PersistenceQuery,
  PersistenceResult,
  PersistenceTransaction,
  PersistenceAdapterFactory,
  MemoryPersistenceAdapter,
  PersistenceConflictError,
  PersistenceVersionError,
} = require('../../../src/enterprise/persistence');

async function run() {
  assert.strictEqual(typeof PersistenceAdapter, 'function');
  const query = new PersistenceQuery({ filters: { tenantId: 'tenant_1' }, sort: ['name:asc'], limit: 1 });
  assert(Object.isFrozen(query));
  const result = new PersistenceResult({ items: [{ id: '1' }], count: 2, limit: 1 });
  assert.strictEqual(result.hasMore, true);

  const registry = new PersistenceRegistry();
  const adapter = new MemoryPersistenceAdapter();
  registry.register('employees', adapter);
  assert.strictEqual(registry.require('employees'), adapter);

  const factory = new PersistenceAdapterFactory();
  factory.register('memory', (options) => new MemoryPersistenceAdapter(options));
  const createdAdapter = factory.create('memory');
  assert(createdAdapter instanceof MemoryPersistenceAdapter);

  await adapter.create({ id: 'employee_1', tenantId: 'tenant_1', name: 'James', version: 1 });
  await adapter.create({ id: 'employee_2', tenantId: 'tenant_2', name: 'Ada', version: 1 });
  assert.strictEqual((await adapter.findMany(query)).items[0].id, 'employee_1');
  assert.strictEqual(await adapter.count({ filters: { tenantId: 'tenant_1' } }), 1);
  assert.strictEqual(await adapter.exists({ filters: { name: 'James' } }), true);

  await assert.rejects(() => adapter.create({ id: 'employee_1' }), PersistenceConflictError);
  await assert.rejects(() => adapter.update({ id: 'employee_1', version: 2 }, { expectedVersion: 9 }), PersistenceVersionError);

  const transaction = new PersistenceTransaction({ adapter });
  const transactionResult = await transaction.run(async (tx) => tx.findById('employee_1'));
  assert.strictEqual(transactionResult.name, 'James');

  console.log('Enterprise Persistence Foundation');
  console.log('---------------------------------');
  console.log('Adapter contract: passed');
  console.log('Query abstraction: passed');
  console.log('Result abstraction: passed');
  console.log('Error hierarchy: passed');
  console.log('Adapter registry: passed');
  console.log('Adapter factory: passed');
  console.log('Transaction boundary: passed');
  console.log('Memory adapter: passed');
  console.log('');
  console.log('✅ Enterprise Persistence Foundation passed');
}

run().catch((error) => {
  console.error('❌ Enterprise Persistence Foundation failed');
  console.error(error);
  process.exit(1);
});
