const {
  RepositoryType,
  RepositoryOperation,
  EnterpriseRepository,
  RepositoryProvider,
  createRepositoryProvider,
  RepositoryRegistry,
  RepositorySession,
  createRepositorySession,
  enterpriseRepositoryMiddleware,
  RepositoryContractError,
  RepositoryNotFoundError,
  RepositoryOperationError,
} = require('../../../../src/enterprise/repository');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

class MemoryRepository extends EnterpriseRepository {
  constructor() {
    super({
      name: 'memory.records',
      type: RepositoryType.ENTITY,
      metadata: {
        storage: 'memory',
      },
    });

    this.records = new Map();
  }

  async findById(id) {
    return this.records.get(id) || null;
  }

  async findMany() {
    return Array.from(this.records.values());
  }

  async save(record) {
    this.records.set(record.id, record);
    return record;
  }

  async delete(id) {
    return this.records.delete(id);
  }
}

async function run() {
  const registry = new RepositoryRegistry();

  const provider = createRepositoryProvider({
    registry,
    container: { name: 'test.container' },
    configuration: { name: 'test.configuration' },
    compositionRoot: { name: 'test.composition' },
  });

  assert(provider instanceof RepositoryProvider, 'provider factory invalid');

  const repository = new MemoryRepository();

  const registered = provider.register(repository);

  assert(registered.name === 'memory.records', 'repository registration name mismatch');
  assert(registered.type === RepositoryType.ENTITY, 'repository registration type mismatch');
  assert(Object.isFrozen(registered), 'repository registration record should be frozen');

  assert(provider.has('memory.records') === true, 'provider has failed');
  assert(provider.get('memory.records') === repository, 'provider get failed');
  assert(provider.describe('memory.records').metadata.storage === 'memory', 'provider describe failed');
  assert(provider.list().length === 1, 'provider list count mismatch');

  const saved = await repository.save({
    id: 'record_001',
    name: 'Kenswell Record',
  });

  assert(saved.id === 'record_001', 'repository save failed');

  const found = await repository.findById('record_001');

  assert(found.name === 'Kenswell Record', 'repository findById failed');

  const many = await repository.findMany();

  assert(many.length === 1, 'repository findMany failed');

  assert(await repository.exists('record_001') === true, 'repository exists failed');

  await repository.delete('record_001');

  assert(await repository.exists('record_001') === false, 'repository delete failed');

  const description = repository.describe();

  assert(description.name === 'memory.records', 'repository describe name mismatch');
  assert(description.type === RepositoryType.ENTITY, 'repository describe type mismatch');
  assert(Object.isFrozen(description), 'repository description should be frozen');

  const session = createRepositorySession({
    metadata: {
      test: true,
    },
  });

  assert(session instanceof RepositorySession, 'session factory invalid');
  assert(session.sessionId.startsWith('repo_session_'), 'session id invalid');

  session.record({
    operation: RepositoryOperation.SAVE,
    repository: 'memory.records',
    entityId: 'record_002',
  });

  assert(session.listOperations().length === 1, 'session operation log failed');

  const committed = session.commit();

  assert(committed.committed === true, 'session commit failed');
  assert(Object.isFrozen(committed), 'session snapshot should be frozen');

  try {
    session.record({
      operation: RepositoryOperation.DELETE,
      repository: 'memory.records',
    });

    throw new Error('recording after commit should fail');
  } catch (error) {
    assert(error instanceof RepositoryOperationError, 'wrong record-after-commit error');
  }

  const rollbackSession = createRepositorySession();

  rollbackSession.record({
    operation: RepositoryOperation.DELETE,
    repository: 'memory.records',
  });

  const rolledBack = rollbackSession.rollback('expected rollback');

  assert(rolledBack.rolledBack === true, 'session rollback failed');
  assert(rolledBack.rollbackReason === 'expected rollback', 'rollback reason mismatch');

  try {
    provider.get('missing.repository');
    throw new Error('missing repository should fail');
  } catch (error) {
    assert(error instanceof RepositoryNotFoundError, 'wrong missing repository error');
  }

  try {
    await new EnterpriseRepository({
      name: 'base.repository',
      type: RepositoryType.ENTITY,
    }).findById('missing');

    throw new Error('base repository should fail contract method');
  } catch (error) {
    assert(error instanceof RepositoryContractError, 'wrong base repository contract error');
  }

  assert(typeof enterpriseRepositoryMiddleware === 'function', 'repository middleware not exported');

  assert(core.repository, 'repository not exported from core');
  assert(typeof core.repository.createRepositoryProvider === 'function', 'core repository export invalid');

  console.log('✅ Enterprise Repository Framework verification passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
