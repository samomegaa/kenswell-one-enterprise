import {
  createContractIndex,
} from '../staffologyContractResolver';

import {
  REGULAR_PAY_FIELDS,
} from './regularPayFields';

import {
  resolveRegularPayField,
} from './regularPayResolver';

import {
  regularPaySource,
} from './regularPaySource';

function resolve(index, field) {
  return resolveRegularPayField(
    index,
    REGULAR_PAY_FIELDS[field]
  );
}

export function adaptStaffologyRegularPay(
  runtimeWorkspace
) {
  const source = regularPaySource(
    runtimeWorkspace
  );

  const index = createContractIndex(source);

  return Object.freeze({
    source,

    schedule:
      resolve(index, 'schedule'),

    basis:
      resolve(index, 'basis'),

    workingPattern:
      resolve(index, 'workingPattern'),

    monthlyAmount:
      resolve(index, 'monthlyAmount'),

    annualSalary:
      resolve(index, 'annualSalary'),

    payCode:
      resolve(index, 'payCode'),

    proRataAdjustments:
      resolve(index, 'proRataAdjustments'),

    baseHourlyRate:
      resolve(index, 'baseHourlyRate'),

    baseDailyRate:
      resolve(index, 'baseDailyRate'),
  });
}
