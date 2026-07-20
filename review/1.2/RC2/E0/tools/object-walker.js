'use strict';

function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function valueType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';

  return typeof value;
}

function walk(source) {
  const entries = [];
  const visited = new WeakSet();

  function visit(value, path = []) {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (visited.has(value)) return;
    visited.add(value);

    Object.entries(value).forEach(([key, item]) => {
      const itemPath = [...path, key];

      entries.push({
        key,
        normalisedKey: normalise(key),
        path: itemPath.join('.'),
        type: valueType(item),
      });

      visit(item, itemPath);
    });
  }

  visit(source);

  return entries;
}

module.exports = Object.freeze({
  normalise,
  walk,
});
