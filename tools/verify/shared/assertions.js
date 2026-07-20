'use strict';

const assert = require('assert');

function includesAll(source, tokens, label) {
  tokens.forEach((token) => {
    assert.ok(
      source.includes(token),
      `${label} is missing ${token}`
    );
  });
}

function operationById(operations, id) {
  const operation = operations.find(
    (item) => item.id === id
  );

  assert.ok(
    operation,
    `Missing operation: ${id}`
  );

  return operation;
}

module.exports = Object.freeze({
  assert,
  includesAll,
  operationById,
});
