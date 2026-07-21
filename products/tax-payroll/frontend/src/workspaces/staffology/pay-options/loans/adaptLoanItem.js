import { resolveLoanItemValue } from './loanItemResolver';

export function adaptLoanItem(item, fields) {
  const resolve = (field) =>
    resolveLoanItemValue(item, fields[field]);

  return Object.freeze({
    source: item,
    id: item?.id || item?.loanId || item?.reference || null,
    type: resolve('type'),
    reference: resolve('reference'),
    deductionAmount: resolve('deductionAmount'),
    outstandingBalance: resolve('outstandingBalance'),
    startDate: resolve('startDate'),
    endDate: resolve('endDate'),
    status: resolve('status'),
  });
}
