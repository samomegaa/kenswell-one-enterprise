import PropTypes from 'prop-types';

export default function EmployeeSelectionToolbar({
  query,
  status,
  selectedCount,
  totalCount,
  onQueryChange,
  onStatusChange,
  onSelectAll,
  onClear,
}) {
  return (
    <div className="employee-selection-toolbar">
      <label>
        <span>Search employees</span>
        <input
          type="search"
          value={query}
          placeholder="Name or payroll reference"
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
        />
      </label>

      <label>
        <span>Employment status</span>
        <select
          value={status}
          onChange={(event) => {
            onStatusChange(event.target.value);
          }}
        >
          <option value="all">All statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </label>

      <div className="employee-selection-actions">
        <span>
          {selectedCount} of {totalCount} selected
        </span>
        <button type="button" onClick={onSelectAll}>
          Select visible
        </button>
        <button type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}

EmployeeSelectionToolbar.propTypes = {
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  selectedCount: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};
