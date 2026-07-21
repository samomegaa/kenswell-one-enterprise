function normalise(value) {
  return String(value)
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLowerCase();
}

export function resolveLoanItemValue(item, aliases) {
  if (!item || typeof item !== 'object') return undefined;
  const wanted = new Set(aliases.map(normalise));

  for (const [key, value] of Object.entries(item)) {
    if (
      wanted.has(normalise(key)) &&
      value !== undefined &&
      value !== null &&
      value !== ''
    ) {
      return value;
    }
  }
  return undefined;
}
