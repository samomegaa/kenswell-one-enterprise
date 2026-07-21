function normalise(value) { return String(value).replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); }
function isRecord(value) { return Boolean(value && typeof value === 'object' && !Array.isArray(value)); }
export function findBankAccounts(source, collectionAliases, objectAliases) {
  const collections = new Set(collectionAliases.map(normalise));
  const objects = new Set(objectAliases.map(normalise));
  const visited = new WeakSet();
  function visit(value) {
    if (!value || typeof value !== 'object' || visited.has(value)) return undefined;
    visited.add(value);
    for (const [key,item] of Object.entries(value)) {
      const name = normalise(key);
      if (collections.has(name) && Array.isArray(item)) return item;
      if (objects.has(name) && isRecord(item)) return [item];
      if (item && typeof item === 'object') { const found=visit(item); if (found!==undefined) return found; }
    }
    return undefined;
  }
  return visit(source);
}
export function firstBankValue(item, aliases) {
  if (!isRecord(item)) return undefined;
  const wanted = new Set(aliases.map(normalise));
  for (const [key,value] of Object.entries(item)) {
    if (wanted.has(normalise(key)) && value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
}
