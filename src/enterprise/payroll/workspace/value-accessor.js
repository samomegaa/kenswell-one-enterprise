'use strict';

function getValueAtPath(source, path) {
  return String(path)
    .split('.')
    .reduce(
      (value, key) => value?.[key],
      source
    );
}

function setValueAtPath(source, path, value) {
  const clone = JSON.parse(
    JSON.stringify(source || {})
  );

  const keys = String(path).split('.');
  let cursor = clone;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      cursor[key] = value;
      return;
    }

    if (
      !cursor[key] ||
      typeof cursor[key] !== 'object'
    ) {
      cursor[key] = {};
    }

    cursor = cursor[key];
  });

  return clone;
}

module.exports = {
  getValueAtPath,
  setValueAtPath,
};
