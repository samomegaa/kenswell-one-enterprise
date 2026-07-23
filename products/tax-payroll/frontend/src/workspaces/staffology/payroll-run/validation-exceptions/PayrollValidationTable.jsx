import PropTypes from 'prop-types';

export default function PayrollValidationTable({
  validations,
}) {
  if (validations.length === 0) {
    return (
      <div className="payroll-validation-empty">
        No validation issues match the current filters.
      </div>
    );
  }

  return (
    <div className="payroll-validation-table-wrap">
      <table className="payroll-validation-table">
        <thead>
          <tr>
            <th scope="col">Severity</th>
            <th scope="col">Code</th>
            <th scope="col">Employee</th>
            <th scope="col">Field</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {validations.map((validation) => (
            <tr key={validation.id}>
              <td>
                <span
                  className={
                    `payroll-validation-severity severity-${validation.severity.toLowerCase()}`
                  }
                >
                  {validation.severity}
                </span>
              </td>
              <td>{validation.codeLabel}</td>
              <td>
                <strong>{validation.employeeLabel}</strong>
                <small>{validation.referenceLabel}</small>
              </td>
              <td>{validation.fieldLabel}</td>
              <td>{validation.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PayrollValidationTable.propTypes = {
  validations: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};
