import {
  createContractIndex,
  firstContractValue,
} from '../staffologyContractResolver';

import {
  firstValue,
} from '../staffologyValueResolver';

import {
  REGULAR_PAY_FIELDS,
} from './regularPayFields';

import {
  regularPaySource,
} from './regularPaySource';

function resolve(index, field) {
  return firstContractValue(
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

  const listedEmployee =
    runtimeWorkspace?.employee || {};

  const index = createContractIndex(source);

  return Object.freeze({
    source,

    employmentType:
      resolve(index, 'employmentType'),

    payBasis:
      resolve(index, 'payBasis'),

    payFrequency:
      resolve(index, 'payFrequency'),

    payrollFrequency:
      resolve(index, 'payrollFrequency'),

    annualSalary:
      resolve(index, 'annualSalary'),

    regularPay:
      resolve(index, 'regularPay'),

    hourlyRate:
      resolve(index, 'hourlyRate'),

    dailyRate:
      resolve(index, 'dailyRate'),

    workingPattern:
      resolve(index, 'workingPattern'),

    normalHours:
      resolve(index, 'normalHours'),

    normalDays:
      resolve(index, 'normalDays'),

    payrollCode: firstValue(
      resolve(index, 'payrollCode'),
      listedEmployee.payrollCode,
      listedEmployee.code
    ),
  });
}
