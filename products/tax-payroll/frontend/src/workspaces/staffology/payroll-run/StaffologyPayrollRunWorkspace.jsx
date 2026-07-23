import { useMemo } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../StaffologyWorkspaceState';

import {
  adaptStaffologyPayrollRun,
} from './adaptStaffologyPayrollRun';

import {
  createPayrollRunPresentationModel,
} from './payrollRunPresentationModel';

import PayrollRunSummaryCard
  from './PayrollRunSummaryCard';

import PayrollRunStatusPanel
  from './PayrollRunStatusPanel';

import PayrollRunPeriodsTable
  from './PayrollRunPeriodsTable';

import {
  StaffologyPayrollEmployeeSelection,
} from './employee-selection';

import {
  StaffologyPayrollCalculationSummary,
} from './calculation-summary';

import {
  StaffologyPayrollValidationExceptions,
} from './validation-exceptions';

import {
  StaffologyPayrollApprovalWorkspace,
} from './approval';

import './payroll-run.css';

export default function StaffologyPayrollRunWorkspace({
  employer,
}) {
  const model = useMemo(
    () => createPayrollRunPresentationModel(
      adaptStaffologyPayrollRun(employer)
    ),
    [employer]
  );

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll runs unavailable"
        message={
          'Payroll-run information is not present in the current Staffology employer response.'
        }
      />
    );
  }

  return (
    <section className="staffology-payroll-run-workspace">
      <header className="payroll-run-header">
        <div>
          <p className="payroll-run-eyebrow">
            Staffology payroll operations
          </p>
          <h1>Payroll Runs</h1>
          <p>
            Review payroll periods and processing state
            from the current runtime response.
          </p>
        </div>

        <span className="payroll-run-provider">
          {model.provider}
        </span>
      </header>

      <div className="payroll-run-metrics">
        {model.metrics.map((metric) => (
          <PayrollRunSummaryCard
            key={metric.label}
            metric={metric}
          />
        ))}
      </div>

      <PayrollRunStatusPanel model={model} />

      <StaffologyPayrollEmployeeSelection
        employer={employer}
        payrollRun={model.current}
      />

      <StaffologyPayrollCalculationSummary
        employer={employer}
        payrollRun={model.current}
      />

      <StaffologyPayrollValidationExceptions
        employer={employer}
        payrollRun={model.current}
      />

      <StaffologyPayrollApprovalWorkspace
        employer={employer}
        payrollRun={model.current}
      />

      <PayrollRunPeriodsTable
        periods={model.periods}
      />
    </section>
  );
}

StaffologyPayrollRunWorkspace.propTypes = {
  employer: PropTypes.object.isRequired,
};
