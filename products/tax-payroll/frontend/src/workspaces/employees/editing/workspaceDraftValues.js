export function getPathValue(
  source,
  path
) {
  if (!path) return undefined;

  return String(path)
    .split('.')
    .reduce(
      (value, key) => value?.[key],
      source
    );
}

export function setPathValue(
  source,
  path,
  nextValue
) {
  const keys = String(path).split('.');
  const root = { ...source };
  let cursor = root;

  keys.forEach((key, index) => {
    const last = index === keys.length - 1;

    if (last) {
      cursor[key] = nextValue;
      return;
    }

    const current = cursor[key];

    cursor[key] = Array.isArray(current)
      ? [...current]
      : { ...(current || {}) };

    cursor = cursor[key];
  });

  return root;
}
