import PropTypes from 'prop-types';

export default function PayrollWorkspaceHeader({ summary }) {
  return (
    <header className="payroll-workspace-header">
      <div>
        <p>Staffology operational payroll</p>
        <h1>Payroll</h1>
        <span>
          Complete the pay run through one controlled workflow.
        </span>
      </div>

      <dl>
        <div>
          <dt>Stages</dt>
          <dd>{summary.total}</dd>
        </div>
        <div>
          <dt>Available</dt>
          <dd>{summary.available}</dd>
        </div>
        <div>
          <dt>Foundation</dt>
          <dd>{summary.foundation}</dd>
        </div>
      </dl>
    </header>
  );
}

PayrollWorkspaceHeader.propTypes = {
  summary: PropTypes.shape({
    total: PropTypes.number.isRequired,
    available: PropTypes.number.isRequired,
    foundation: PropTypes.number.isRequired,
  }).isRequired,
};
