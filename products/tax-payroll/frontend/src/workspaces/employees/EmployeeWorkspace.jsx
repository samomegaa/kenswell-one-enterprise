import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  WorkspaceAudit,
  WorkspaceError,
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSection,
  WorkspaceSkeleton,
  WorkspaceTimeline,
} from '../framework';

import EmployeeEditingWorkspace from './editing/EmployeeEditingWorkspace';
import useEmployeeWorkspace from './useEmployeeWorkspace';

import {
  SummaryPanel,
  EmploymentPanel,
  PayrollPanel,
  TaxPanel,
  PensionPanel,
  LeavePanel,
  ProviderPanel,
} from './EmployeePanels';

import {
  EMPLOYEE_SECTIONS,
  displayName,
  displayStatus,
  formatDate,
} from './employeeWorkspaceModel';

export default function EmployeeWorkspace({ employeeId, onBack }) {
  const [activeSection, setActiveSection] = useState('summary');
  const [editing, setEditing] = useState(false);
  const { employee, loading, error, reload } =
    useEmployeeWorkspace(employeeId);

  const timeline = useMemo(
    () =>
      employee
        ? [
            {
              id: 'created',
              title: 'Employee created',
              occurredAt: employee.createdAt,
              displayTime: formatDate(employee.createdAt),
            },
            {
              id: 'updated',
              title: 'Employee record updated',
              occurredAt: employee.updatedAt,
              displayTime: formatDate(employee.updatedAt),
            },
          ]
        : [],
    [employee]
  );

  const audit = useMemo(
    () =>
      employee
        ? [
            {
              id: `v${employee.version}`,
              action: 'Canonical employee version',
              actor: 'Kenswell One Enterprise',
              version: employee.version,
              occurredAt: employee.updatedAt,
              displayTime: formatDate(employee.updatedAt),
            },
          ]
        : [],
    [employee]
  );

  if (loading) return <WorkspaceSkeleton />;
  if (error) {
    return <WorkspaceError message={error.message} onRetry={reload} />;
  }
  if (!employee) {
    return (
      <WorkspaceError
        message="Employee record was not returned."
        onRetry={reload}
      />
    );
  }

  if (editing) {
    return (
      <EmployeeEditingWorkspace
        employee={employee}
        onCancel={() => setEditing(false)}
        onSaved={async () => {
          setEditing(false);
          await reload();
        }}
      />
    );
  }

  const panels = {
    summary: <SummaryPanel employee={employee} />,
    employment: <EmploymentPanel employee={employee} />,
    payroll: <PayrollPanel employee={employee} />,
    tax: <TaxPanel employee={employee} />,
    pension: <PensionPanel employee={employee} />,
    leave: <LeavePanel employee={employee} />,
    provider: <ProviderPanel employee={employee} />,
    timeline: (
      <WorkspaceSection title="Timeline">
        <WorkspaceTimeline events={timeline} />
      </WorkspaceSection>
    ),
    audit: (
      <WorkspaceSection title="Audit">
        <WorkspaceAudit entries={audit} />
      </WorkspaceSection>
    ),
  };

  return (
    <WorkspaceLayout
      header={
        <WorkspaceHeader
          eyebrow="Payroll employee"
          title={displayName(employee)}
          status={displayStatus(employee)}
          subtitle={`Payroll code ${
            employee.employment?.payrollCode || '—'
          }`}
          metadata={[
            { label: 'Client', value: employee.clientId },
            { label: 'Employer', value: employee.employerId },
            {
              label: 'Provider',
              value: employee.provider?.provider || 'Not linked',
            },
          ]}
          actions={
            <div className="employee-workspace-actions">
              <button type="button" onClick={() => setEditing(true)}>
                Edit employee
              </button>
              {onBack && (
                <button type="button" onClick={onBack}>
                  Back to payroll
                </button>
              )}
            </div>
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={EMPLOYEE_SECTIONS}
          activeId={activeSection}
          onSelect={setActiveSection}
          ariaLabel="Employee workspace sections"
        />
      }
    >
      {panels[activeSection]}
    </WorkspaceLayout>
  );
}

EmployeeWorkspace.propTypes = {
  employeeId: PropTypes.string.isRequired,
  onBack: PropTypes.func,
};
