function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

function isRecord(value) {
  return value &&
    typeof value === 'object' &&
    !Array.isArray(value);
}

export function findCollection(source, aliases) {
  const targets = new Set(
    aliases.map(normalise)
  );
  const visited = new WeakSet();

  function visit(value) {
    if (!value || typeof value !== 'object') {
      return undefined;
    }

    if (visited.has(value)) {
      return undefined;
    }

    visited.add(value);

    for (const [key, item] of Object.entries(value)) {
      if (
        targets.has(normalise(key)) &&
        Array.isArray(item)
      ) {
        return item;
      }

      if (isRecord(item) || Array.isArray(item)) {
        const result = visit(item);

        if (result) {
          return result;
        }
      }
    }

    return undefined;
  }

  return visit(source);
}
