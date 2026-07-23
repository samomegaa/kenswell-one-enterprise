import PropTypes from 'prop-types';

export default function PayrollApprovalSummary({ model }) {
  return (
    <section className="payroll-approval-summary">
      <article>
        <span>Approval status</span>
        <strong>{model.status}</strong>
      </article>
      {model.gates.map((gate) => (
        <article key={gate.label}>
          <span>{gate.label}</span>
          <strong>{gate.value}</strong>
        </article>
      ))}
    </section>
  );
}

PayrollApprovalSummary.propTypes = {
  model: PropTypes.shape({
    status: PropTypes.string.isRequired,
    gates: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
