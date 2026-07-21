export const BANK_ACCOUNT_FIELDS = Object.freeze({
  collections: Object.freeze(['bankAccounts','employeeBankAccounts','paymentAccounts']),
  objects: Object.freeze(['bankAccount','employeeBankAccount','paymentAccount','bankDetails']),
  accountName: Object.freeze(['accountName','accountHolderName','nameOnAccount']),
  bankName: Object.freeze(['bankName','institutionName','bank']),
  sortCode: Object.freeze(['sortCode','bankSortCode','branchCode']),
  accountNumber: Object.freeze(['accountNumber','bankAccountNumber','number']),
  rollNumber: Object.freeze(['buildingSocietyRollNumber','rollNumber','buildingSocietyReference']),
  paymentMethod: Object.freeze(['paymentMethod','payMethod','paymentType']),
  primary: Object.freeze(['primary','isPrimary','primaryAccount']),
  effectiveFrom: Object.freeze(['effectiveFrom','startDate','fromDate']),
  effectiveTo: Object.freeze(['effectiveTo','endDate','toDate']),
  status: Object.freeze(['status','accountStatus','state']),
});
