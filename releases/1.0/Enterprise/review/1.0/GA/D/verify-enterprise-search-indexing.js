const {
  SearchDocumentType,
  SearchIndexStatus,
  SearchDocument,
  SearchIndexRegistry,
  SearchProvider,
  createSearchProvider,
  enterpriseSearchMiddleware,
  SearchDocumentError,
  SearchIndexNotFoundError,
} = require('../../../../src/enterprise/search');

const core = require('../../../../packages/core/src');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const registry = new SearchIndexRegistry();

const provider = createSearchProvider({
  registry,
  repositories: { name: 'test.repositories' },
  scheduler: { name: 'test.scheduler' },
  notifications: { name: 'test.notifications' },
  configuration: { name: 'test.configuration' },
  compositionRoot: { name: 'test.composition' },
});

assert(provider instanceof SearchProvider, 'provider factory invalid');

const firstDocument = new SearchDocument({
  type: SearchDocumentType.ENTITY,
  title: 'Kenswell Enterprise Record',
  body: 'This record belongs to the Kenswell One platform.',
  source: {
    module: 'verification',
    id: 'record_001',
  },
  metadata: {
    tenant: 'test',
  },
});

const secondDocument = new SearchDocument({
  type: SearchDocumentType.DOCUMENT,
  title: 'Payroll Document',
  body: 'Monthly payroll schedule and employee payment details.',
  source: {
    module: 'payroll',
    id: 'document_001',
  },
});

const indexed = provider.index(firstDocument);

assert(indexed.status === SearchIndexStatus.INDEXED, 'first document not indexed');
assert(indexed.id === firstDocument.id, 'indexed document id mismatch');
assert(Object.isFrozen(indexed), 'indexed record should be frozen');

provider.index(secondDocument);

assert(provider.has(firstDocument.id) === true, 'provider has failed');
assert(provider.get(firstDocument.id).title === 'Kenswell Enterprise Record', 'provider get failed');
assert(provider.list().length === 2, 'provider list count mismatch');

const kenswellResults = provider.search('kenswell');

assert(kenswellResults.ok === true, 'search result not ok');
assert(kenswellResults.count === 1, 'kenswell search count mismatch');
assert(kenswellResults.results[0].id === firstDocument.id, 'kenswell result mismatch');
assert(Object.isFrozen(kenswellResults), 'search result should be frozen');

const documentResults = provider.search('', {
  type: SearchDocumentType.DOCUMENT,
});

assert(documentResults.count === 1, 'type filtered search count mismatch');
assert(documentResults.results[0].id === secondDocument.id, 'type filtered result mismatch');

const removed = provider.remove(firstDocument.id);

assert(removed.status === SearchIndexStatus.REMOVED, 'remove status mismatch');

const afterRemoveResults = provider.search('kenswell');

assert(afterRemoveResults.count === 0, 'removed document should not appear in search');

try {
  provider.get('missing_document');
  throw new Error('missing document should fail');
} catch (error) {
  assert(error instanceof SearchIndexNotFoundError, 'wrong missing document error');
}

try {
  new SearchDocument({
    type: SearchDocumentType.ENTITY,
    body: 'missing title',
  });

  throw new Error('missing title should fail');
} catch (error) {
  assert(error instanceof SearchDocumentError, 'wrong missing title error');
}

assert(typeof enterpriseSearchMiddleware === 'function', 'search middleware not exported');

assert(core.search, 'search not exported from core');
assert(typeof core.search.createSearchProvider === 'function', 'core search export invalid');

console.log('✅ Enterprise Search and Indexing verification passed');
