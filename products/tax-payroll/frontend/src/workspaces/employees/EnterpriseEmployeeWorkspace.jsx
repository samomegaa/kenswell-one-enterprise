import {
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import {
  WorkspaceError,
  WorkspaceHeader,
  WorkspaceLayout,
  WorkspaceNavigation,
  WorkspaceSkeleton,
} from '../framework';

import useEnterpriseEmployeeWorkspace
  from './useEnterpriseEmployeeWorkspace';

import {
  displayName,
  displayStatus,
} from './employeeWorkspaceModel';

import {
  SectionRenderer,
} from './rendering';

import {
  ReadinessDashboard,
} from './readiness';

export default function EnterpriseEmployeeWorkspace({
  employeeId,
  onBack,
}) {
  const [activeSection, setActiveSection] =
    useState(null);

  const {
    workspace,
    employee,
    loading,
    error,
    reload,
  } = useEnterpriseEmployeeWorkspace(employeeId);

  useEffect(() => {
    if (
      workspace?.navigation?.length &&
      !workspace.navigation.some(
        (item) => item.id === activeSection
      )
    ) {
      setActiveSection(
        workspace.navigation[0].id
      );
    }
  }, [workspace, activeSection]);

  if (loading) return <WorkspaceSkeleton />;

  if (error) {
    return (
      <WorkspaceError
        message={error.message}
        onRetry={reload}
      />
    );
  }

  if (!workspace || !employee) {
    return (
      <WorkspaceError
        message="Enterprise workspace was not returned."
        onRetry={reload}
      />
    );
  }

  const section =
    workspace.visibleWorkspace.sections.find(
      (item) => item.id === activeSection
    ) ||
    workspace.visibleWorkspace.sections[0];

  return (
    <WorkspaceLayout
      header={
        <WorkspaceHeader
          eyebrow="Canonical payroll workspace"
          title={displayName(employee)}
          status={displayStatus(employee)}
          subtitle={
            `Contract ${workspace.contract?.version || '—'}`
          }
          metadata={[
            {
              label: 'Provider',
              value:
                workspace.providerPanel?.summary
                  ?.provider || 'Not linked',
            },
            {
              label: 'Sync',
              value:
                workspace.providerPanel?.summary
                  ?.synchronisationState || 'Unknown',
            },
          ]}
          actions={
            onBack ? (
              <button
                type="button"
                onClick={onBack}
              >
                Back to payroll
              </button>
            ) : null
          }
        />
      }
      navigation={
        <WorkspaceNavigation
          items={workspace.navigation}
          activeId={section?.id}
          onSelect={setActiveSection}
          ariaLabel="Canonical payroll sections"
        />
      }
    >
      <ReadinessDashboard
        workspace={workspace}
        onSelectSection={setActiveSection}
      />

      {section ? (
        <SectionRenderer
          section={section}
          employee={employee}
          disabled
        />
      ) : (
        <WorkspaceError
          message="No visible workspace section is available."
        />
      )}
    </WorkspaceLayout>
  );
}

EnterpriseEmployeeWorkspace.propTypes = {
  employeeId: PropTypes.string.isRequired,
  onBack: PropTypes.func,
};
