import {
  regularPaySource,
} from '../regularPaySource';

import {
  ADDITION_FIELDS,
} from './additionFields';

import {
  DEDUCTION_FIELDS,
} from './deductionFields';

import {
  findCollection,
} from './collectionResolver';

import {
  adaptPayItem,
} from './adaptPayItem';

function adaptCollection(source, fields) {
  const collection = findCollection(
    source,
    fields.collections
  );

  if (!collection) {
    return Object.freeze({
      available: false,
      items: Object.freeze([]),
    });
  }

  return Object.freeze({
    available: true,
    items: Object.freeze(
      collection.map(
        (item) => adaptPayItem(item, fields)
      )
    ),
  });
}

export function adaptStaffologyAdditionsDeductions(
  runtimeWorkspace
) {
  const source = regularPaySource(runtimeWorkspace);

  return Object.freeze({
    source,
    additions: adaptCollection(
      source,
      ADDITION_FIELDS
    ),
    deductions: adaptCollection(
      source,
      DEDUCTION_FIELDS
    ),
  });
}
