const RepositoryType = Object.freeze({
  ENTITY: 'entity',
  READ_MODEL: 'read_model',
  EVENT_STORE: 'event_store',
  DOCUMENT: 'document',
  FILE: 'file',
  CACHE: 'cache',
  SEARCH: 'search',
});

const RepositoryOperation = Object.freeze({
  FIND_BY_ID: 'findById',
  FIND_MANY: 'findMany',
  SAVE: 'save',
  DELETE: 'delete',
  EXISTS: 'exists',
});

module.exports = {
  RepositoryType,
  RepositoryOperation,
};
