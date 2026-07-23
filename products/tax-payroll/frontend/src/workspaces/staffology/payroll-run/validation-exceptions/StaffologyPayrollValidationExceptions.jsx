import { useMemo } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import {
  adaptStaffologyPayrollValidation,
} from './adaptStaffologyPayrollValidation';

import {
  createPayrollValidationPresentationModel,
} from './payrollValidationPresentationModel';

import {
  usePayrollValidationFilters,
} from './usePayrollValidationFilters';

import PayrollValidationSummary
  from './PayrollValidationSummary';

import PayrollValidationToolbar
  from './PayrollValidationToolbar';

import PayrollValidationTable
  from './PayrollValidationTable';

import './payroll-validation-exceptions.css';
import './payroll-validation-states.css';
import './payroll-validation-responsive.css';

export default function StaffologyPayrollValidationExceptions({
  employer,
  payrollRun,
}) {
  const model = useMemo(
    () => createPayrollValidationPresentationModel(
      adaptStaffologyPayrollValidation(
        employer,
        payrollRun
      )
    ),
    [employer, payrollRun]
  );

  const filters =
    usePayrollValidationFilters(model.validations);

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll validations unavailable"
        message={
          'Validation and exception information is not present in the current Staffology payroll response.'
        }
      />
    );
  }

  return (
    <section className="payroll-validation-panel">
      <header className="payroll-validation-heading">
        <div>
          <p className="payroll-run-eyebrow">
            Payroll validation and exceptions
          </p>
          <h2>Validation results</h2>
          <p>
            Review payroll issues supplied by the current
            Staffology runtime response.
          </p>
        </div>

        <span className="payroll-validation-read-only">
          Read only
        </span>
      </header>

      <PayrollValidationSummary
        counts={model.counts}
      />

      <PayrollValidationToolbar
        query={filters.query}
        severity={filters.severity}
        onQueryChange={filters.setQuery}
        onSeverityChange={filters.setSeverity}
      />

      <PayrollValidationTable
        validations={filters.visibleValidations}
      />

      <p className="payroll-validation-note">
        Issues cannot be corrected, dismissed, or waived
        from this Release 1.4-A4 workspace.
      </p>
    </section>
  );
}

StaffologyPayrollValidationExceptions.propTypes = {
  employer: PropTypes.object.isRequired,
  payrollRun: PropTypes.object,
};
