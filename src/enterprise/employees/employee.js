const crypto = require('crypto');
const { createEmployeeIdentity } = require('./employee-identity');
const { createEmployment } = require('./employment');
const { createPayrollProfile } = require('./payroll-profile');
const { createTaxProfile } = require('./tax-profile');
const { createNationalInsurance } = require('./national-insurance');
const { createPensionProfile } = require('./pension-profile');
const { createBankAccount } = require('./bank-account');
const { createLeaveProfile } = require('./leave-profile');
const { createProviderReference } = require('./provider-reference');
function createEmployee(input = {}) {
  if (!input.clientId || !input.employerId) throw new Error('Employee requires clientId and employerId');
  const now = new Date().toISOString();
  return Object.freeze({
    id: input.id || `employee_${crypto.randomUUID()}`, clientId: input.clientId, employerId: input.employerId,
    identity: createEmployeeIdentity(input.identity), employment: createEmployment(input.employment),
    payroll: createPayrollProfile(input.payroll), tax: createTaxProfile(input.tax),
    nationalInsurance: createNationalInsurance(input.nationalInsurance), pension: createPensionProfile(input.pension),
    bankAccount: createBankAccount(input.bankAccount), leave: createLeaveProfile(input.leave),
    provider: createProviderReference(input.provider), createdAt: input.createdAt || now, updatedAt: input.updatedAt || now, version: input.version || 1,
  });
}
module.exports = { createEmployee };
