import {
  useEffect,
  useState,
} from 'react';

import {
  useEmployerRuntime,
  useEmployeeRuntime,
  employerEmployeesPath,
  employeeWorkspacePath,
  employersPath,
} from '../../runtime';

import { EmployerSelector } from './EmployerSelector';
import { EmployerRuntimeGuard } from './EmployerRuntimeGuard';
import { RuntimeStatePanel } from './RuntimeStatePanel';
import StaffologyEmployeeWorkspace
  from '../staffology/StaffologyEmployeeWorkspace';

import { EmployeeList } from '../employees/EmployeeList';
import {
  EmployeeRuntimeGuard,
} from '../employees/EmployeeRuntimeGuard';
import {
  useEmployeeWorkspaceRuntime,
} from '../employees/useEmployeeWorkspaceRuntime';

export default function EnterpriseProviderCentre({
  route,
  navigate,
  onBack,
}) {
  const {
    selectedEmployer,
    selectEmployer,
    refreshEmployers,
  } = useEmployerRuntime();

  const {
    employees,
    selectedEmployee,
    selectEmployee,
    refreshEmployees,
  } = useEmployeeRuntime();

  const {
    workspace,
    loading: workspaceLoading,
    error: workspaceError,
    loadWorkspace,
    clearWorkspace,
  } = useEmployeeWorkspaceRuntime();

  const [routeError, setRouteError] = useState(null);

  useEffect(() => {
    if (!route?.employerId) return;

    try {
      if (selectedEmployer?.id !== route.employerId) {
        selectEmployer(route.employerId);
      }
      setRouteError(null);
    } catch (error) {
      setRouteError(error);
    }
  }, [
    route?.employerId,
    selectedEmployer?.id,
    selectEmployer,
  ]);

  useEffect(() => {
    if (!route?.employeeId || !employees.length) {
      return;
    }

    try {
      if (selectedEmployee?.id !== route.employeeId) {
        selectEmployee(route.employeeId);
      }
      setRouteError(null);
    } catch (error) {
      setRouteError(error);
    }
  }, [
    route?.employeeId,
    employees,
    selectedEmployee?.id,
    selectEmployee,
  ]);

  useEffect(() => {
    if (
      !route?.isWorkspace ||
      !selectedEmployee ||
      workspace ||
      workspaceLoading
    ) {
      return;
    }

    loadWorkspace(selectedEmployee).catch(() => {});
  }, [
    route?.isWorkspace,
    selectedEmployee,
    workspace,
    workspaceLoading,
    loadWorkspace,
  ]);

  function handleEmployerSelected(employer) {
    clearWorkspace();
    navigate(employerEmployeesPath(employer.id));
  }

  async function handleOpenWorkspace(employee) {
    const loaded = await loadWorkspace(employee);

    navigate(
      employeeWorkspacePath(
        loaded.employer.id,
        loaded.employee.id
      )
    );
  }

  if (routeError) {
    return (
      <RuntimeStatePanel
        title="Runtime route unavailable"
        message={routeError.message}
        actionLabel="Return to employers"
        onAction={() => navigate(employersPath())}
        tone="error"
      />
    );
  }

  if (route?.isWorkspace && workspace) {
    return (
      <StaffologyEmployeeWorkspace
        runtimeWorkspace={workspace}
        onBack={() => {
          clearWorkspace();
          navigate(
            employerEmployeesPath(
              workspace.employer.id
            )
          );
        }}
      />
    );
  }

  return (
    <main className="enterprise-provider-centre">
      <header className="enterprise-provider-centre__header">
        <div>
          <p className="eyebrow">
            Kenswell One Enterprise
          </p>
          <h1>Provider Centre</h1>
          <p>
            Discover employers, inspect employees and
            open employer-scoped workspaces.
          </p>
        </div>

        <button type="button" onClick={onBack}>
          Back to practice
        </button>
      </header>

      <EmployerRuntimeGuard
        loadingFallback={
          <RuntimeStatePanel
            title="Loading employers"
            message="Connecting to the Enterprise API."
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
            actionLabel="Refresh"
            onAction={() =>
              refreshEmployers({ refresh: true })
            }
          />
        }
      >
        <EmployerSelector
          onEmployerSelected={handleEmployerSelected}
        />

        {selectedEmployer && (
          <EmployeeRuntimeGuard
            loadingFallback={
              <RuntimeStatePanel
                title="Loading employees"
                message={`Retrieving employees for ${selectedEmployer.name}.`}
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
                message={`${selectedEmployer.name} currently has no employees available.`}
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
              onEmployeeSelected={(employee) => {
                selectEmployee(employee);
                navigate(
                  employerEmployeesPath(
                    selectedEmployer.id
                  )
                );
              }}
              onOpenWorkspace={handleOpenWorkspace}
            />
          </EmployeeRuntimeGuard>
        )}
      </EmployerRuntimeGuard>

      {workspaceLoading && (
        <RuntimeStatePanel
          title="Opening workspace"
          message="Loading the Enterprise workspace."
        />
      )}

      {workspaceError && (
        <RuntimeStatePanel
          title="Workspace unavailable"
          message={workspaceError.message}
          tone="error"
        />
      )}
    </main>
  );
}
