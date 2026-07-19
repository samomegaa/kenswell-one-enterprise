import {
  useMemo,
  useState,
} from 'react';

import {
  WorkspaceAudit,
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSection,
  WorkspaceTimeline,
} from '../framework';

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

import {
  adaptRuntimeEmployee,
} from './runtimeEmployeeAdapter';

export default function RuntimeEmployeeWorkspace({
  runtimeWorkspace,
  onBack,
}) {
  const [activeSection, setActiveSection] =
    useState('summary');

  const employee = useMemo(
    () => adaptRuntimeEmployee(runtimeWorkspace),
    [runtimeWorkspace]
  );

  const timeline = useMemo(
    () => [
      {
        id: 'runtime-loaded',
        title: 'Enterprise runtime workspace loaded',
        occurredAt: employee.updatedAt,
        displayTime: formatDate(employee.updatedAt),
      },
      {
        id: 'employee-created',
        title: 'Employee record created',
        occurredAt: employee.createdAt,
        displayTime: formatDate(employee.createdAt),
      },
    ],
    [employee]
  );

  const audit = useMemo(
    () => [
      {
        id: `runtime-v${employee.version}`,
        action: 'Runtime employee projection',
        actor: 'Kenswell One Enterprise',
        version: employee.version,
        occurredAt: employee.updatedAt,
        displayTime: formatDate(employee.updatedAt),
      },
    ],
    [employee]
  );

  const panels = {
    summary: <SummaryPanel employee={employee} />,
    employment: (
      <EmploymentPanel employee={employee} />
    ),
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
          eyebrow="Enterprise payroll employee"
          title={displayName(employee)}
          status={displayStatus(employee)}
          subtitle={`Payroll code ${
            employee.employment?.payrollCode || '—'
          }`}
          metadata={[
            {
              label: 'Employer',
              value:
                runtimeWorkspace.employer?.name ||
                employee.employerId,
            },
            {
              label: 'Provider',
              value:
                employee.provider?.provider ||
                'Staffology',
            },
            {
              label: 'Runtime',
              value: 'Dynamic',
            },
          ]}
          actions={
            onBack ? (
              <button type="button" onClick={onBack}>
                Back to employees
              </button>
            ) : null
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={EMPLOYEE_SECTIONS}
          activeId={activeSection}
          onSelect={setActiveSection}
          ariaLabel="Enterprise employee sections"
        />
      }
    >
      {panels[activeSection]}
    </WorkspaceLayout>
  );
}
