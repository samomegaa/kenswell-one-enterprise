import {
  LEAVE_FIELDS,
} from './leaveFields';

import {
  findLeaveCollection,
  firstLeaveValue,
} from './leaveResolver';

function sourceOf(runtimeWorkspace) {
  return (
    runtimeWorkspace?.employee ||
    runtimeWorkspace?.workspace ||
    runtimeWorkspace?.data ||
    runtimeWorkspace ||
    {}
  );
}

function adaptItem(item) {
  const resolve = (field) =>
    firstLeaveValue(
      item,
      LEAVE_FIELDS[field]
    );

  return Object.freeze({
    source: item,

    id:
      item?.id ||
      item?.leaveId ||
      item?.absenceId ||
      null,

    type: resolve('type'),
    startDate: resolve('startDate'),
    endDate: resolve('endDate'),
    duration: resolve('duration'),
    unit: resolve('unit'),
    paid: resolve('paid'),
    paymentStatus:
      resolve('paymentStatus'),
    entitlementImpact:
      resolve('entitlementImpact'),
    status: resolve('status'),
    reason: resolve('reason'),
  });
}

export function adaptStaffologyLeave(
  runtimeWorkspace
) {
  const source = sourceOf(runtimeWorkspace);

  const records = findLeaveCollection(
    source,
    LEAVE_FIELDS.collections
  );

  if (!records) {
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
      records.map(adaptItem)
    ),
  });
}
