const {
  createEmployee,
} = require('./employee');

const {
  createEmployeeRecord,
} = require('./employee-record');

function toEmployeeRecord(employee) {
  return createEmployeeRecord({
    id: employee.id,
    clientId: employee.clientId,
    employerId: employee.employerId,
    version: employee.version || 1,
    createdAt: employee.createdAt,
    updatedAt: employee.updatedAt,
    provider:
      employee.provider?.provider || null,
    externalEmployeeId:
      employee.provider
        ?.externalEmployeeId || null,
    payload: {
      identity: employee.identity,
      employment: employee.employment,
      payroll: employee.payroll,
      tax: employee.tax,
      nationalInsurance:
        employee.nationalInsurance,
      pension: employee.pension,
      bankAccount: employee.bankAccount,
      leave: employee.leave,
      provider: employee.provider,
    },
  });
}

function fromEmployeeRecord(record) {
  return createEmployee({
    id: record.id,
    clientId: record.clientId,
    employerId: record.employerId,
    version: record.version,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    ...record.payload,
  });
}

module.exports = {
  toEmployeeRecord,
  fromEmployeeRecord,
};
