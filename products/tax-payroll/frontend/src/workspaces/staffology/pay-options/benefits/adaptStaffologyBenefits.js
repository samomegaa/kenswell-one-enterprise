import {
  regularPaySource,
} from '../regularPaySource';

import {
  BENEFIT_FIELDS,
} from './benefitFields';

import {
  resolveBenefitCollection,
} from './benefitCollectionResolver';

import {
  adaptBenefitItem,
} from './adaptBenefitItem';

export function adaptStaffologyBenefits(
  runtimeWorkspace
) {
  const source = regularPaySource(
    runtimeWorkspace
  );

  const collection = resolveBenefitCollection(
    source,
    BENEFIT_FIELDS.collections
  );

  if (!collection) {
    return Object.freeze({
      source,
      available: false,
      items: Object.freeze([]),
    });
  }

  return Object.freeze({
    source,
    available: true,
    items: Object.freeze(
      collection.map(
        (item) => adaptBenefitItem(
          item,
          BENEFIT_FIELDS
        )
      )
    ),
  });
}
