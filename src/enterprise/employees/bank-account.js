function createBankAccount(input = {}) {
  return Object.freeze({ accountName: input.accountName || null, sortCode: input.sortCode || null, accountNumber: input.accountNumber || null, buildingSocietyReference: input.buildingSocietyReference || null, paymentReference: input.paymentReference || null });
}
module.exports = { createBankAccount };
