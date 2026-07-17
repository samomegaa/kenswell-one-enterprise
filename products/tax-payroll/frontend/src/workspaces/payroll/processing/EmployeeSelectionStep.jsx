import PropTypes from 'prop-types';

export default function EmployeeSelectionStep({
  employees,
  selectedIds,
  error,
  onToggle,
  onSelectAll,
}) {
  return (
    <div className="payroll-selection">
      <header>
        <div>
          <strong>{selectedIds.length} selected</strong>
          <p>Choose the employees to include in this payroll run.</p>
        </div>

        <button type="button" onClick={onSelectAll}>
          {selectedIds.length === employees.length
            ? 'Clear selection'
            : 'Select all'}
        </button>
      </header>

      {error && <p className="payroll-processing-error">{error}</p>}

      <div className="payroll-selection__list">
        {employees.map((employee) => (
          <label key={employee.id}>
            <input
              type="checkbox"
              checked={selectedIds.includes(employee.id)}
              onChange={() => onToggle(employee.id)}
            />
            <span>
              <strong>{employee.displayName}</strong>
              <small>{employee.payrollCode || 'No payroll code'}</small>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

EmployeeSelectionStep.propTypes = {
  employees: PropTypes.array.isRequired,
  selectedIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  error: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
};
