import PropTypes from 'prop-types';
import { LIFECYCLE_ACTIONS } from './employeeEditingModel';

export default function EmployeeLifecyclePanel({
  employee,
  onLifecycleAction,
}) {
  const status = employee.employment?.status || 'unknown';

  return (
    <div className="employee-lifecycle">
      <div className="employee-lifecycle__summary">
        <span>Current status</span>
        <strong>{status.replaceAll('_', ' ')}</strong>
      </div>

      <div className="employee-lifecycle__actions">
        {LIFECYCLE_ACTIONS.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => onLifecycleAction(action)}
          >
            {action.label}
          </button>
        ))}
      </div>

      <p>
        Lifecycle changes are saved through the version-aware Employee API
        and recorded by the Employee audit boundary.
      </p>
    </div>
  );
}

EmployeeLifecyclePanel.propTypes = {
  employee: PropTypes.object.isRequired,
  onLifecycleAction: PropTypes.func.isRequired,
};
