export const LOAN_FIELDS = Object.freeze({
  collections: Object.freeze([
    'loans',
    'employeeLoans',
    'payrollLoans',
    'loanDeductions',
  ]),
  type: Object.freeze([
    'loanType',
    'type',
    'category',
    'description',
  ]),
  reference: Object.freeze([
    'reference',
    'loanReference',
    'accountReference',
    'identifier',
  ]),
  deductionAmount: Object.freeze([
    'deductionAmount',
    'amount',
    'periodAmount',
    'repaymentAmount',
  ]),
  outstandingBalance: Object.freeze([
    'outstandingBalance',
    'balance',
    'remainingBalance',
    'amountOutstanding',
  ]),
  startDate: Object.freeze([
    'startDate',
    'effectiveFrom',
    'fromDate',
  ]),
  endDate: Object.freeze([
    'endDate',
    'effectiveTo',
    'toDate',
  ]),
  status: Object.freeze([
    'status',
    'loanStatus',
    'state',
  ]),
});
