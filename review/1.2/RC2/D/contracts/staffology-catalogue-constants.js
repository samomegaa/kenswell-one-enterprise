'use strict';

const ACCESS = Object.freeze({
  READ: 'read',
  WRITE: 'write',
  READ_WRITE: 'read-write',
  UNKNOWN: 'unknown',
});

const STATUS = Object.freeze({
  VERIFIED: 'verified',
  DISCOVERED: 'discovered',
  PLANNED: 'planned',
  UNSUPPORTED: 'unsupported',
  UNKNOWN: 'unknown',
});

const DATA_CLASSIFICATION = Object.freeze({
  PUBLIC: 'public',
  INTERNAL: 'internal',
  PERSONAL: 'personal',
  SENSITIVE_PERSONAL: 'sensitive-personal',
  FINANCIAL: 'financial',
  TAX: 'tax',
});

module.exports = Object.freeze({
  ACCESS,
  STATUS,
  DATA_CLASSIFICATION,
});
