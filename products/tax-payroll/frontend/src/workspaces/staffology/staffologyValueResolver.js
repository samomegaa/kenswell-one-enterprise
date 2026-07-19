function usable(value) {
  return (
    value !== undefined &&
    value !== null &&
    value !== ''
  );
}

export function asRecord(value) {
  return (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
    ? value
    : {};
}

export function firstValue(...values) {
  return values.find(usable);
}

export function valueAtPath(source, path) {
  return path
    .split('.')
    .reduce(
      (value, key) =>
        value &&
        typeof value === 'object'
          ? value[key]
          : undefined,
      source
    );
}

export function firstPath(source, paths) {
  for (const path of paths) {
    const value = valueAtPath(source, path);

    if (usable(value)) {
      return value;
    }
  }

  return undefined;
}

export function booleanLabel(value) {
  if (value === true) return 'Yes';
  if (value === false) return 'No';

  return value;
}
