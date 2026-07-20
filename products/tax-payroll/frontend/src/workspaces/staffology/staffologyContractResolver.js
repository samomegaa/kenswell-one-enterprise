function normaliseKey(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function isRecord(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}

function isUsable(value) {
  return (
    value !== undefined &&
    value !== null &&
    value !== ''
  );
}

export function createContractIndex(source) {
  const index = new Map();
  const visited = new WeakSet();

  function visit(value, path = []) {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (visited.has(value)) {
      return;
    }

    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach((item, position) => {
        visit(item, [...path, String(position)]);
      });

      return;
    }

    Object.entries(value).forEach(([key, item]) => {
      const itemPath = [...path, key];
      const normalised = normaliseKey(key);

      if (
        !isRecord(item) &&
        !Array.isArray(item) &&
        isUsable(item)
      ) {
        if (!index.has(normalised)) {
          index.set(normalised, []);
        }

        index.get(normalised).push({
          path: itemPath.join('.'),
          value: item,
        });
      }

      if (
        isRecord(item) ||
        Array.isArray(item)
      ) {
        visit(item, itemPath);
      }
    });
  }

  visit(source);

  return index;
}

export function firstContractValue(
  index,
  aliases
) {
  for (const alias of aliases) {
    const matches = index.get(
      normaliseKey(alias)
    );

    if (matches?.length) {
      return matches[0].value;
    }
  }

  return undefined;
}

export function contractMatches(
  index,
  aliases
) {
  const matches = [];

  aliases.forEach((alias) => {
    const values = index.get(
      normaliseKey(alias)
    );

    if (values) {
      matches.push(...values);
    }
  });

  return matches;
}
