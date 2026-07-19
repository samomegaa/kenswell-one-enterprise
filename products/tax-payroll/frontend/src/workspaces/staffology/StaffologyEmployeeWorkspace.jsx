import {
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import './staffology-employee-workspace.css';

import {
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
} from '../framework';

import {
  STAFFOLOGY_EMPLOYEE_TABS,
} from './staffologyEmployeeWorkspaceContract';

import {
  adaptStaffologyBasicDetails,
} from './adaptStaffologyBasicDetails';

import StaffologyBasicDetailsPanel
  from './StaffologyBasicDetailsPanel';

import StaffologySectionPending
  from './StaffologySectionPending';

export default function StaffologyEmployeeWorkspace({
  runtimeWorkspace,
  onBack,
}) {
  const [activeTab, setActiveTab] =
    useState('basic-details');

  const employee = useMemo(
    () => adaptStaffologyBasicDetails(
      runtimeWorkspace
    ),
    [runtimeWorkspace]
  );

  const navigation = useMemo(
    () => STAFFOLOGY_EMPLOYEE_TABS.map(
      (tab) => ({
        id: tab.id,
        label: tab.label,
      })
    ),
    []
  );

  const selectedTab =
    STAFFOLOGY_EMPLOYEE_TABS.find(
      (tab) => tab.id === activeTab
    ) || STAFFOLOGY_EMPLOYEE_TABS[0];

  const content =
    activeTab === 'basic-details'
      ? (
        <StaffologyBasicDetailsPanel
          employee={employee}
        />
      )
      : (
        <StaffologySectionPending
          title={selectedTab.label}
        />
      );

  return (
    <WorkspaceLayout
      className="staffology-employee-workspace"
      header={
        <WorkspaceHeader
          eyebrow="Staffology payroll employee"
          title={employee.displayName}
          status="Read only"
          subtitle={
            `Employee reference ${employee.id || '—'}`
          }
          metadata={[
            {
              label: 'Employer',
              value:
                runtimeWorkspace.employer?.name ||
                '—',
            },
            {
              label: 'Provider',
              value: 'Staffology',
            },
            {
              label: 'Runtime',
              value: 'Dynamic',
            },
          ]}
          actions={
            <button type="button" onClick={onBack}>
              Back to employees
            </button>
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={navigation}
          activeId={activeTab}
          onSelect={setActiveTab}
          ariaLabel="Staffology employee sections"
        />
      }
    >
      {content}
    </WorkspaceLayout>
  );
}

StaffologyEmployeeWorkspace.propTypes = {
  runtimeWorkspace: PropTypes.shape({
    employer: PropTypes.object,
    employee: PropTypes.object,
    workspace: PropTypes.object,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};
