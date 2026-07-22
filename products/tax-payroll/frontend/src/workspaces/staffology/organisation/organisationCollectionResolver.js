export function readPath(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

export function resolveCollection(source, candidates) {
  for (const path of candidates) {
    const value = readPath(source, path);
    if (Array.isArray(value)) {
      return { available: true, items: value, sourcePath: path };
    }
  }
  return { available: false, items: [], sourcePath: null };
}

export function firstValue(source, paths) {
  for (const path of paths) {
    const value = readPath(source, path);
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return null;
}
