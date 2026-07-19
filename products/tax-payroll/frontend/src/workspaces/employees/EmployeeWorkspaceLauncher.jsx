import {
  useEmployeeWorkspaceRuntime,
} from './useEmployeeWorkspaceRuntime';

export function EmployeeWorkspaceLauncher({
  employee,
  onWorkspaceLoaded,
  children,
}) {
  const {
    loading,
    error,
    loadWorkspace,
  } = useEmployeeWorkspaceRuntime();

  async function handleOpen() {
    const runtimeWorkspace =
      await loadWorkspace(employee);

    onWorkspaceLoaded?.(runtimeWorkspace);
  }

  return (
    <div className="employee-workspace-launcher">
      <button
        type="button"
        onClick={handleOpen}
        disabled={loading}
      >
        {loading ? 'Opening…' : 'Open workspace'}
      </button>

      {error && (
        <p role="alert">
          {error.message}
        </p>
      )}

      {children}
    </div>
  );
}
