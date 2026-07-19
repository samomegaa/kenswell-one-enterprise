import {
  useState,
} from 'react';

import {
  useEmployerRuntime,
  useEmployeeRuntime,
} from '../../runtime';

import {
  EmployerSelector,
} from './EmployerSelector';

import {
  EmployerRuntimeGuard,
} from './EmployerRuntimeGuard';

import {
  RuntimeStatePanel,
} from './RuntimeStatePanel';

import {
  EmployeeList,
} from '../employees/EmployeeList';

import {
  EmployeeRuntimeGuard,
} from '../employees/EmployeeRuntimeGuard';

import {
  useEmployeeWorkspaceRuntime,
} from '../employees/useEmployeeWorkspaceRuntime';

function WorkspaceEvidence({
  runtimeWorkspace,
  onClose,
}) {
  return (
    <section className="runtime-sidecar__workspace">
      <header>
        <div>
          <p className="eyebrow">
            Enterprise workspace
          </p>
          <h3>
            {runtimeWorkspace.employee?.displayName ||
              runtimeWorkspace.employee?.name ||
              runtimeWorkspace.employee?.id}
          </h3>
        </div>

        <button type="button" onClick={onClose}>
          Close
        </button>
      </header>

      <pre>
        {JSON.stringify(
          runtimeWorkspace.workspace,
          null,
          2
        )}
      </pre>
    </section>
  );
}

export function EnterpriseRuntimeSidecar() {
  const {
    selectedEmployer,
    refreshEmployers,
  } = useEmployerRuntime();

  const {
    refreshEmployees,
  } = useEmployeeRuntime();

  const {
    workspace,
    loading: workspaceLoading,
    error: workspaceError,
    loadWorkspace,
    clearWorkspace,
  } = useEmployeeWorkspaceRuntime();

  const [expanded, setExpanded] = useState(false);

  return (
    <section className="runtime-sidecar">
      <header className="runtime-sidecar__header">
        <div>
          <p className="eyebrow">
            Enterprise runtime
          </p>
          <h2>Employer employees</h2>
          <p>
            Open the dynamic employer-scoped employee
            runtime without replacing the linked-client
            workflow above.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? 'Hide runtime' : 'Open runtime'}
        </button>
      </header>

      {expanded && (
        <div className="runtime-sidecar__body">
          <EmployerRuntimeGuard
            loadingFallback={
              <RuntimeStatePanel
                title="Loading employers"
                message="Connecting to Enterprise API."
              />
            }
            errorFallback={(error) => (
              <RuntimeStatePanel
                title="Employer discovery failed"
                message={error.message}
                actionLabel="Retry"
                onAction={() =>
                  refreshEmployers({ refresh: true })
                }
                tone="error"
              />
            )}
            emptyFallback={
              <RuntimeStatePanel
                title="No employers discovered"
                message="No employers were returned."
              />
            }
          >
            <EmployerSelector
              onEmployerSelected={() => {
                clearWorkspace();
              }}
            />

            {selectedEmployer && (
              <EmployeeRuntimeGuard
                loadingFallback={
                  <RuntimeStatePanel
                    title="Loading employees"
                    message={
                      `Retrieving employees for ` +
                      `${selectedEmployer.name}.`
                    }
                  />
                }
                errorFallback={(error) => (
                  <RuntimeStatePanel
                    title="Employee discovery failed"
                    message={error.message}
                    actionLabel="Retry"
                    onAction={refreshEmployees}
                    tone="error"
                  />
                )}
                emptyFallback={
                  <RuntimeStatePanel
                    title="No employees found"
                    message={
                      `${selectedEmployer.name} currently ` +
                      'has no employees available.'
                    }
                    actionLabel="Refresh employees"
                    onAction={refreshEmployees}
                  />
                }
                employerFallback={
                  <RuntimeStatePanel
                    title="Select an employer"
                    message="Choose an employer first."
                  />
                }
              >
                <EmployeeList
                  onOpenWorkspace={(employee) => {
                    loadWorkspace(employee).catch(() => {});
                  }}
                />
              </EmployeeRuntimeGuard>
            )}
          </EmployerRuntimeGuard>

          {workspaceLoading && (
            <RuntimeStatePanel
              title="Opening workspace"
              message="Loading Enterprise workspace."
            />
          )}

          {workspaceError && (
            <RuntimeStatePanel
              title="Workspace unavailable"
              message={workspaceError.message}
              tone="error"
            />
          )}

          {workspace && (
            <WorkspaceEvidence
              runtimeWorkspace={workspace}
              onClose={clearWorkspace}
            />
          )}
        </div>
      )}
    </section>
  );
}
