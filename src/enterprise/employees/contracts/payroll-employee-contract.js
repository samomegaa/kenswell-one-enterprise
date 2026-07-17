'use strict';

const SECTIONS = Object.freeze({
  PERSONAL: 'personal',
  ADDRESS: 'address',
  EMPLOYMENT: 'employment',
  PAY: 'pay',
  TAX: 'tax',
  NI: 'nationalInsurance',
  LOANS: 'loans',
  BANK: 'bank',
  PENSION: 'pension',
  RTI: 'rti',
  OPENING_BALANCES: 'openingBalances',
  PROVIDER_REFERENCES: 'providerReferences',
});

const FIELDS = Object.freeze({
  personal: [
    'title', 'firstName', 'middleName', 'lastName', 'knownAs',
    'dateOfBirth', 'gender', 'maritalStatus', 'email',
    'telephone', 'mobile',
  ],
  address: [
    'line1', 'line2', 'line3', 'town', 'county', 'postCode', 'country',
  ],
  employment: [
    'payrollCode', 'previousPayrollCode', 'employeeType',
    'employmentStatus', 'startDate', 'continuousStartDate',
    'leavingDate', 'lastPaymentDate', 'jobTitle',
    'departmentCode', 'departmentName', 'costCentreCode',
    'costCentreName', 'isDirector', 'directorStartDate',
    'directorEndDate', 'directorNiAlternativeMethod',
    'isApprentice', 'isOffPayrollWorker', 'irregularPaymentPattern',
    'hoursNormallyWorked', 'contractedHoursPerWeek',
    'workingPatternTitle', 'workingPatternEffectiveDate',
  ],
  pay: [
    'payScheduleId', 'payScheduleOrdinal', 'payFrequency',
    'payBasis', 'payAmount', 'payAmountMultiplier',
    'annualPayAmount', 'baseHourlyRate', 'paymentMethod',
    'onHold', 'nationalMinimumWage',
  ],
  tax: [
    'starterDeclaration', 'taxCode', 'week1Month1',
    'p45MarkedAsSent', 'p45Gross', 'p45Tax',
    'foreignTaxCredits', 'withholdTaxRefund',
  ],
  nationalInsurance: [
    'number', 'category', 'employersNiNotPayable',
    'workingInFreeport', 'workingInInvestmentZone',
    'veteransFirstCivilianEmploymentDate',
  ],
  loans: ['studentLoanPlan', 'postgraduateLoan'],
  bank: [
    'bankName', 'bankBranch', 'bankReference', 'accountName',
    'sortCode', 'accountNumber', 'bankNote',
    'buildingSocietyRollNumber',
  ],
  pension: [
    'paidPension', 'annualPensionAmount', 'autoEnrolmentOptOut',
    'autoEnrolmentOptOutDate', 'autoEnrolmentExempt',
    'autoEnrolmentExemptReason', 'assessmentDeferred',
    'assessmentDeferredIsMonths', 'postponementLetterSent',
    'pensionStartDate', 'membershipNumber', 'isQualifyingScheme',
    'schemeName', 'workerGroupName', 'autoEnrolled',
  ],
  rti: [
    'excludeFromRti', 'nonIndividual',
    'secondedFromOverseasEmployer', 'overseasSecondmentStatus',
    'eeaCitizen', 'epm6',
  ],
  openingBalances: [
    'grossPay', 'taxPaid', 'employeeNi', 'employerNi',
    'studentLoanRecovered', 'postgraduateLoanRecovered',
    'statutoryMaternityPay', 'statutoryPaternityPay',
    'statutoryAdoptionPay', 'sharedParentalPay',
    'statutoryParentalBereavementPay',
  ],
  providerReferences: [
    'provider', 'employerId', 'employeeId', 'payScheduleId',
    'providerVersion', 'lastSynchronisedAt',
  ],
});

function createComprehensivePayrollEmployee(overrides = {}) {
  return {
    personal: {},
    address: {},
    employment: {},
    pay: {},
    tax: {},
    nationalInsurance: {},
    loans: {},
    bank: {},
    pension: {},
    rti: {},
    openingBalances: {},
    providerReferences: {},
    ...overrides,
  };
}

module.exports = { SECTIONS, FIELDS, createComprehensivePayrollEmployee };
