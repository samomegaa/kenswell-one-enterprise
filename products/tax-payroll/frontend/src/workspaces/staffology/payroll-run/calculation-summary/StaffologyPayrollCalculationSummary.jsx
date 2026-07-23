import { useMemo } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import {
  adaptStaffologyPayrollCalculation,
} from './adaptStaffologyPayrollCalculation';

import {
  createPayrollCalculationPresentationModel,
} from './payrollCalculationPresentationModel';

import PayrollCalculationMetric
  from './PayrollCalculationMetric';

import PayrollCalculationLiabilities
  from './PayrollCalculationLiabilities';

import './payroll-calculation-summary.css';

export default function StaffologyPayrollCalculationSummary({
  employer,
  payrollRun,
}) {
  const model = useMemo(
    () => createPayrollCalculationPresentationModel(
      adaptStaffologyPayrollCalculation(
        employer,
        payrollRun
      )
    ),
    [employer, payrollRun]
  );

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll calculation unavailable"
        message={
          'Calculation totals are not present in the current Staffology payroll response.'
        }
      />
    );
  }

  return (
    <section className="payroll-calculation-panel">
      <header className="payroll-calculation-heading">
        <div>
          <p className="payroll-run-eyebrow">
            Payroll calculation summary
          </p>
          <h2>Calculated payroll totals</h2>
          <p>
            Read-only totals supplied by the current
            Staffology payroll runtime.
          </p>
        </div>

        <div className="payroll-calculation-count">
          <strong>{model.employeeCount}</strong>
          <span>employees</span>
        </div>
      </header>

      <div className="payroll-calculation-metrics">
        {model.headline.map((metric) => (
          <PayrollCalculationMetric
            key={metric.label}
            metric={metric}
          />
        ))}
      </div>

      <PayrollCalculationLiabilities
        liabilities={model.liabilities}
      />

      <p className="payroll-calculation-note">
        Values are displayed exactly as resolved from the
        runtime contract. No payroll calculation is performed
        by this workspace.
      </p>
    </section>
  );
}

StaffologyPayrollCalculationSummary.propTypes = {
  employer: PropTypes.object.isRequired,
  payrollRun: PropTypes.object,
};
