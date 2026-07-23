import PropTypes from 'prop-types';

export default function PayrollValidationToolbar({
  query,
  severity,
  onQueryChange,
  onSeverityChange,
}) {
  return (
    <div className="payroll-validation-toolbar">
      <label>
        <span>Search issues</span>
        <input
          type="search"
          value={query}
          placeholder="Code, employee, field or message"
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
        />
      </label>

      <label>
        <span>Severity</span>
        <select
          value={severity}
          onChange={(event) => {
            onSeverityChange(event.target.value);
          }}
        >
          <option value="all">All severities</option>
          <option value="Error">Errors</option>
          <option value="Warning">Warnings</option>
          <option value="Information">
            Information
          </option>
          <option value="Unavailable">
            Unavailable
          </option>
        </select>
      </label>
    </div>
  );
}

PayrollValidationToolbar.propTypes = {
  query: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  onSeverityChange: PropTypes.func.isRequired,
};
