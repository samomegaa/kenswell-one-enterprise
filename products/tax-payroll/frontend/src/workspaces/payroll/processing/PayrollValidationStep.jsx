import PropTypes from 'prop-types';

export default function PayrollValidationStep({
  validation,
  validating,
  onValidate,
}) {
  if (!validation) {
    return (
      <div className="payroll-validation">
        <p>
          Run pre-payroll checks for missing tax, NI, pension, payment and
          employment data.
        </p>
        <button type="button" onClick={onValidate} disabled={validating}>
          {validating ? 'Validating…' : 'Run validation'}
        </button>
      </div>
    );
  }

  return (
    <div className="payroll-validation">
      <div className="payroll-validation__summary">
        <strong>{validation.passed ? 'Validation passed' : 'Action required'}</strong>
        <span>{validation.issues?.length || 0} issue(s)</span>
      </div>

      <ul>
        {(validation.issues || []).map((issue) => (
          <li key={issue.id}>
            <strong>{issue.title}</strong>
            <span>{issue.message}</span>
          </li>
        ))}
      </ul>

      <button type="button" onClick={onValidate} disabled={validating}>
        Run validation again
      </button>
    </div>
  );
}

PayrollValidationStep.propTypes = {
  validation: PropTypes.object,
  validating: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
};
