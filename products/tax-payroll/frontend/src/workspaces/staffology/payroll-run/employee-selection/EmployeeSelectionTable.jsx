import PropTypes from 'prop-types';

export default function EmployeeSelectionTable({
  employees,
  selectedIds,
  onToggle,
}) {
  if (employees.length === 0) {
    return (
      <div className="employee-selection-empty">
        No employees match the current filters.
      </div>
    );
  }

  return (
    <div className="employee-selection-table-wrap">
      <table className="employee-selection-table">
        <thead>
          <tr>
            <th scope="col">Include</th>
            <th scope="col">Employee</th>
            <th scope="col">Reference</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="checkbox"
                  aria-label={
                    `Select ${employee.displayName}`
                  }
                  checked={selectedIds.has(employee.id)}
                  onChange={() => onToggle(employee.id)}
                />
              </td>
              <td>{employee.displayName}</td>
              <td>{employee.referenceLabel}</td>
              <td>
                <span
                  className={
                    `employee-status employee-status-${employee.statusLabel.toLowerCase()}`
                  }
                >
                  {employee.statusLabel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

EmployeeSelectionTable.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  selectedIds: PropTypes.instanceOf(Set).isRequired,
  onToggle: PropTypes.func.isRequired,
};
