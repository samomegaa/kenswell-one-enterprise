export const PAYROLL_CALCULATION_CONTRACT = Object.freeze({
  objectKeys: Object.freeze([
    'calculation',
    'calculationSummary',
    'payrollCalculation',
    'totals',
    'summary',
  ]),
  fields: Object.freeze({
    grossPay: Object.freeze([
      'grossPay',
      'gross',
      'totalGross',
      'grossEarnings',
    ]),
    netPay: Object.freeze([
      'netPay',
      'net',
      'totalNet',
    ]),
    deductions: Object.freeze([
      'deductions',
      'totalDeductions',
    ]),
    employerCost: Object.freeze([
      'employerCost',
      'totalEmployerCost',
      'employmentCost',
    ]),
    tax: Object.freeze([
      'tax',
      'incomeTax',
      'paye',
      'totalTax',
    ]),
    employeeNi: Object.freeze([
      'employeeNi',
      'employeeNIC',
      'employeeNationalInsurance',
    ]),
    employerNi: Object.freeze([
      'employerNi',
      'employerNIC',
      'employerNationalInsurance',
    ]),
    pension: Object.freeze([
      'pension',
      'pensionContributions',
      'totalPension',
    ]),
    employeeCount: Object.freeze([
      'employeeCount',
      'employeesCount',
      'numberOfEmployees',
    ]),
  }),
});
