import {
  resolveBenefitItemValue,
} from './benefitItemResolver';

export function adaptBenefitItem(
  item,
  fields
) {
  const resolve = (field) =>
    resolveBenefitItemValue(
      item,
      fields[field]
    );

  return Object.freeze({
    source: item,

    id:
      item?.id ||
      item?.benefitId ||
      item?.reference ||
      null,

    type: resolve('type'),

    description: resolve('description'),

    cashEquivalent:
      resolve('cashEquivalent'),

    payrolled: resolve('payrolled'),

    p11dRequired:
      resolve('p11dRequired'),

    startDate: resolve('startDate'),

    endDate: resolve('endDate'),

    status: resolve('status'),
  });
}
