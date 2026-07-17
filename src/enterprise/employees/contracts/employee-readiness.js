'use strict';

const CREATION_REQUIRED = Object.freeze([
  'personal.firstName',
  'personal.lastName',
  'personal.dateOfBirth',
  'employment.payrollCode',
  'employment.startDate',
]);

const PAYROLL_REQUIRED = Object.freeze([
  ...CREATION_REQUIRED,
  'pay.payScheduleId',
  'pay.payFrequency',
  'pay.payBasis',
  'tax.taxCode',
  'tax.starterDeclaration',
  'nationalInsurance.category',
]);

const RTI_REQUIRED = Object.freeze([
  ...PAYROLL_REQUIRED,
  'personal.gender',
  'address.line1',
  'address.postCode',
  'address.country',
]);

function get(source, path) {
  return path.split('.').reduce((value, key) => value?.[key], source);
}

function missing(source, fields) {
  return fields.filter((path) => {
    const value = get(source, path);
    return value === undefined || value === null || value === '';
  });
}

function evaluateReadiness(employee) {
  const creation = missing(employee, CREATION_REQUIRED);
  const payroll = missing(employee, PAYROLL_REQUIRED);
  const rti = missing(employee, RTI_REQUIRED);

  return Object.freeze({
    creation: { ready: creation.length === 0, missing: creation },
    payroll: { ready: payroll.length === 0, missing: payroll },
    rti: { ready: rti.length === 0, missing: rti },
  });
}

module.exports = {
  CREATION_REQUIRED,
  PAYROLL_REQUIRED,
  RTI_REQUIRED,
  evaluateReadiness,
};
