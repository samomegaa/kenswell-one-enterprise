import {
  createContractIndex,
} from '../../staffologyContractResolver';

import {
  regularPaySource,
} from '../regularPaySource';

import {
  OTHER_FIELDS,
} from './otherFields';

import {
  resolveOtherField,
} from './otherResolver';

function resolve(index, field) {
  return resolveOtherField(
    index,
    OTHER_FIELDS[field]
  );
}

export function adaptStaffologyOther(
  runtimeWorkspace
) {
  const source = regularPaySource(
    runtimeWorkspace
  );

  const index = createContractIndex(source);

  return Object.freeze({
    source,

    payrollCode:
      resolve(index, 'payrollCode'),

    paymentMethod:
      resolve(index, 'paymentMethod'),

    onHold:
      resolve(index, 'onHold'),

    excludeFromPayroll:
      resolve(index, 'excludeFromPayroll'),

    irregularPaymentPattern:
      resolve(index, 'irregularPaymentPattern'),

    hoursNormallyWorked:
      resolve(index, 'hoursNormallyWorked'),

    workingPattern:
      resolve(index, 'workingPattern'),

    employmentStatus:
      resolve(index, 'employmentStatus'),

    offPayrollWorker:
      resolve(index, 'offPayrollWorker'),

    occupationalPension:
      resolve(index, 'occupationalPension'),

    foreignTaxCredit:
      resolve(index, 'foreignTaxCredit'),

    expatriate:
      resolve(index, 'expatriate'),
  });
}
