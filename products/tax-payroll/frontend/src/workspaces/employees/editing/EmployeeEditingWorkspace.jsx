import PropTypes from 'prop-types';

import {
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSection,
} from '../../framework';

import EditIdentityPanel from './EditIdentityPanel';
import EditEmploymentPanel from './EditEmploymentPanel';
import EditPayrollPanel from './EditPayrollPanel';
import EditTaxPanel from './EditTaxPanel';
import EditPensionPanel from './EditPensionPanel';
import EmployeeLifecyclePanel from './EmployeeLifecyclePanel';
import EmployeeEditReview from './EmployeeEditReview';
import useEmployeeEditing from './useEmployeeEditing';
import { editingTitle } from './employeeEditingModel';

export default function EmployeeEditingWorkspace({
  employee,
  onCancel,
  onSaved,
}) {
  const editing = useEmployeeEditing({ employee, onSaved });

  const panels = {
    identity: (
      <EditIdentityPanel
        employee={editing.draft}
        errors={editing.errors}
        onChange={editing.change}
      />
    ),
    employment: (
      <EditEmploymentPanel
        employee={editing.draft}
        errors={editing.errors}
        onChange={editing.change}
      />
    ),
    payroll: (
      <EditPayrollPanel
        employee={editing.draft}
        errors={editing.errors}
        onChange={editing.change}
      />
    ),
    tax: (
      <EditTaxPanel
        employee={editing.draft}
        errors={editing.errors}
        onChange={editing.change}
      />
    ),
    pension: (
      <EditPensionPanel
        employee={editing.draft}
        onChange={editing.change}
      />
    ),
    lifecycle: (
      <EmployeeLifecyclePanel
        employee={editing.draft}
        onLifecycleAction={editing.lifecycle}
      />
    ),
    review: <EmployeeEditReview employee={editing.draft} />,
  };

  return (
    <WorkspaceLayout
      header={
        <WorkspaceHeader
          eyebrow="Enterprise employee management"
          title={`Edit ${editingTitle(editing.draft)}`}
          subtitle="Update employee details and lifecycle state."
          metadata={[
            { label: 'Employee ID', value: employee.id },
            { label: 'Version', value: `v${employee.version}` },
          ]}
          actions={
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={editing.sections}
          activeId={editing.activeId}
          onSelect={editing.setActiveId}
          ariaLabel="Employee editing sections"
        />
      }
    >
      <WorkspaceSection
        title={
          editing.sections.find((item) => item.id === editing.activeId)?.label
        }
      >
        {panels[editing.activeId]}

        {editing.saveError && (
          <p className="employee-edit-error" role="alert">
            {editing.saveError}
          </p>
        )}

        <footer className="employee-edit-actions">
          <button type="button" onClick={onCancel}>
            Discard changes
          </button>
          <button
            type="button"
            onClick={editing.save}
            disabled={editing.saving}
          >
            {editing.saving ? 'Saving…' : 'Save employee'}
          </button>
        </footer>
      </WorkspaceSection>
    </WorkspaceLayout>
  );
}

EmployeeEditingWorkspace.propTypes = {
  employee: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired,
};
