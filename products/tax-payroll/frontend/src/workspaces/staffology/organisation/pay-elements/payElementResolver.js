import {
  firstValue,
  readPath,
} from '../organisationCollectionResolver';

import {
  PAY_ELEMENT_FIELDS,
  PAY_ELEMENT_GROUPS,
} from './payElementContract';

function normaliseCollection(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.items)) {
    return value.items;
  }

  if (value && Array.isArray(value.results)) {
    return value.results;
  }

  return null;
}

export function resolvePayElementGroup(
  source,
  group
) {
  for (const path of group.paths) {
    const items = normaliseCollection(
      readPath(source, path)
    );

    if (items) {
      return {
        available: true,
        items,
        sourcePath: path,
      };
    }
  }

  return {
    available: false,
    items: [],
    sourcePath: null,
  };
}

export function resolvePayElementField(
  source,
  field
) {
  return firstValue(
    source,
    PAY_ELEMENT_FIELDS[field] || []
  );
}

export function resolvePayElementGroups(source) {
  return PAY_ELEMENT_GROUPS.map((group) => ({
    ...group,
    ...resolvePayElementGroup(source, group),
  }));
}
