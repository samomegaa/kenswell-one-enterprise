'use strict';

function pass(name, details = null) {
  return Object.freeze({
    name,
    passed: true,
    details,
  });
}

function fail(name, error) {
  return Object.freeze({
    name,
    passed: false,
    error:
      error instanceof Error
        ? error
        : new Error(String(error)),
  });
}

module.exports = Object.freeze({
  pass,
  fail,
});
