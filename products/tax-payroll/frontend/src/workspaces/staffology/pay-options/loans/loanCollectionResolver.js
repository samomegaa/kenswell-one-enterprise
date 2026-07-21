function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

export function resolveLoanCollection(source, aliases) {
  const wanted = new Set(aliases.map(normalise));
  const visited = new WeakSet();

  function visit(value) {
    if (!value || typeof value !== 'object') return undefined;
    if (visited.has(value)) return undefined;
    visited.add(value);

    for (const [key, item] of Object.entries(value)) {
      if (wanted.has(normalise(key)) && Array.isArray(item)) {
        return item;
      }
      if (item && typeof item === 'object') {
        const found = visit(item);
        if (found !== undefined) return found;
      }
    }
    return undefined;
  }

  return visit(source);
}
