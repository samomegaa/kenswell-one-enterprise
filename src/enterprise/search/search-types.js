const SearchDocumentType = Object.freeze({
  ENTITY: 'entity',
  READ_MODEL: 'read_model',
  AUDIT_EVENT: 'audit_event',
  NOTIFICATION: 'notification',
  JOB: 'job',
  FILE: 'file',
  DOCUMENT: 'document',
});

const SearchIndexStatus = Object.freeze({
  CREATED: 'created',
  INDEXED: 'indexed',
  REMOVED: 'removed',
  FAILED: 'failed',
});

module.exports = {
  SearchDocumentType,
  SearchIndexStatus,
};
