import { useMemo } from 'react';
import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import {
  adaptStaffologyPayrollEmployees,
} from './adaptStaffologyPayrollEmployees';

import {
  createEmployeeSelectionPresentationModel,
} from './employeeSelectionPresentationModel';

import {
  usePayrollEmployeeSelection,
} from './usePayrollEmployeeSelection';

import EmployeeSelectionToolbar
  from './EmployeeSelectionToolbar';

import EmployeeSelectionTable
  from './EmployeeSelectionTable';

import './employee-selection.css';
import './employee-selection-responsive.css';

export default function StaffologyPayrollEmployeeSelection({
  employer,
  payrollRun,
}) {
  const model = useMemo(
    () => createEmployeeSelectionPresentationModel(
      adaptStaffologyPayrollEmployees(employer)
    ),
    [employer]
  );

  const selection =
    usePayrollEmployeeSelection(model);

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll employees unavailable"
        message={
          'Employee information is not present in the current Staffology employer response.'
        }
      />
    );
  }

  return (
    <section className="employee-selection-panel">
      <header className="employee-selection-heading">
        <div>
          <p className="payroll-run-eyebrow">
            Payroll employee selection
          </p>
          <h2>Employees in this payroll</h2>
          <p>
            Review the employees associated with{' '}
            {payrollRun?.name || 'the current payroll period'}.
          </p>
        </div>

        <div className="employee-selection-summary">
          <strong>{selection.selectedIds.size}</strong>
          <span>selected</span>
        </div>
      </header>

      <EmployeeSelectionToolbar
        query={selection.query}
        status={selection.status}
        selectedCount={selection.selectedIds.size}
        totalCount={model.totalCount}
        onQueryChange={selection.setQuery}
        onStatusChange={selection.setStatus}
        onSelectAll={selection.selectVisible}
        onClear={selection.clearSelection}
      />

      <EmployeeSelectionTable
        employees={selection.visibleEmployees}
        selectedIds={selection.selectedIds}
        onToggle={selection.toggleEmployee}
      />

      <p className="employee-selection-note">
        Selection is local and read-only in Release 1.4-A2.
        It is not saved or submitted.
      </p>
    </section>
  );
}

StaffologyPayrollEmployeeSelection.propTypes = {
  employer: PropTypes.object.isRequired,
  payrollRun: PropTypes.object,
};
