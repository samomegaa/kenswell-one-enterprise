'use strict';

const FIELD_TYPES = Object.freeze({
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime',
  ARRAY: 'array',
  OBJECT: 'object',
  MONEY: 'money',
  PERCENTAGE: 'percentage',
});

const FIELD_CONTROLS = Object.freeze({
  TEXT: 'text',
  EMAIL: 'email',
  TELEPHONE: 'telephone',
  TEXTAREA: 'textarea',
  NUMBER: 'number',
  DATE: 'date',
  DATETIME: 'datetime',
  CHECKBOX: 'checkbox',
  SELECT: 'select',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
  READ_ONLY: 'read-only',
  JSON: 'json',
});

const SUPPORTED_FIELD_TYPES = Object.freeze(
  Object.values(FIELD_TYPES)
);

const SUPPORTED_FIELD_CONTROLS = Object.freeze(
  Object.values(FIELD_CONTROLS)
);

module.exports = {
  FIELD_TYPES,
  FIELD_CONTROLS,
  SUPPORTED_FIELD_TYPES,
  SUPPORTED_FIELD_CONTROLS,
};
