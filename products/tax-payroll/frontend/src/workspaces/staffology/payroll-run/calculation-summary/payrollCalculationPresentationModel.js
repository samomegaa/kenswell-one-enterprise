import {
  formatPayrollCount,
  formatPayrollMoney,
} from './payrollCalculationPresentation';

function moneyMetric(label, value) {
  return {
    label,
    value: formatPayrollMoney(value),
  };
}

export function createPayrollCalculationPresentationModel(
  contract
) {
  const values = contract.values || {};

  return {
    available: contract.available,
    source: contract.source,
    headline: [
      moneyMetric('Gross pay', values.grossPay),
      moneyMetric('Net pay', values.netPay),
      moneyMetric('Total deductions', values.deductions),
      moneyMetric('Employer cost', values.employerCost),
    ],
    liabilities: [
      moneyMetric('PAYE income tax', values.tax),
      moneyMetric('Employee National Insurance', values.employeeNi),
      moneyMetric('Employer National Insurance', values.employerNi),
      moneyMetric('Pension contributions', values.pension),
    ],
    employeeCount:
      formatPayrollCount(values.employeeCount),
  };
}
