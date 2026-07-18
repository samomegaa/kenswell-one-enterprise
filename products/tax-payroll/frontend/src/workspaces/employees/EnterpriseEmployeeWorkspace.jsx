import {
  useEffect,
  useMemo,
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

import {
  useWorkspaceDraft,
  WorkspaceDraftBar,
} from './editing';

import {
  ProviderPanel,
} from './provider';

export default function EnterpriseEmployeeWorkspace({
  employeeId,
  onBack,
}) {
  const [activeSection, setActiveSection] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const {
    workspace,
    employee,
    loading,
    error,
    reload,
  } = useEnterpriseEmployeeWorkspace(employeeId);

  const draft = useWorkspaceDraft(employee);

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

  const navigation = useMemo(
    () =>
      (workspace?.navigation || []).map(
        (item) => ({
          ...item,
          changed: Boolean(
            draft.changedSections[item.id]
          ),
        })
      ),
    [workspace, draft.changedSections]
  );

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

  function prepareSave() {
    console.info(
      'Enterprise workspace save payload',
      draft.buildPayload(employeeId)
    );
  }

  function prepareSynchronisation() {
    console.info(
      'Provider synchronisation prepared',
      {
        employeeId,
        provider:
          workspace.providerPanel?.summary
            ?.provider,
        changes:
          draft.buildPayload(employeeId)
            .changes,
      }
    );
  }

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
          items={navigation}
          activeId={section?.id}
          onSelect={setActiveSection}
          ariaLabel="Canonical payroll sections"
        />
      }
    >
      <WorkspaceDraftBar
        editing={editing}
        dirty={draft.dirty}
        changedCount={draft.changedCount}
        onEdit={() => setEditing(true)}
        onDiscard={() => {
          draft.discard();
          setEditing(false);
        }}
        onPrepareSave={prepareSave}
      />

      <ReadinessDashboard
        workspace={workspace}
        onSelectSection={setActiveSection}
      />

      <ProviderPanel
        panel={workspace.providerPanel}
        contract={workspace.contract}
        onRefresh={reload}
        onPrepareSynchronisation={
          prepareSynchronisation
        }
        onSelectSection={setActiveSection}
      />

      {section ? (
        <SectionRenderer
          section={section}
          employee={draft.values}
          disabled={!editing}
          onChange={draft.changeField}
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
