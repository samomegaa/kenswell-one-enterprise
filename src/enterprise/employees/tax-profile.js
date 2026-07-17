function createTaxProfile(input = {}) {
  return Object.freeze({ taxCode: input.taxCode || null, taxBasis: input.taxBasis || null, starterDeclaration: input.starterDeclaration || null, studentLoanPlan: input.studentLoanPlan || null, postgraduateLoan: input.postgraduateLoan === true, previousPay: input.previousPay ?? null, previousTax: input.previousTax ?? null });
}
module.exports = { createTaxProfile };
