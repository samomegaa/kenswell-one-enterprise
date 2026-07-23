import PropTypes from 'prop-types';

export default function PayrollCalculationLiabilities({
  liabilities,
}) {
  return (
    <section className="payroll-calculation-section">
      <h3>Statutory liabilities</h3>

      <dl className="payroll-calculation-list">
        {liabilities.map((liability) => (
          <div key={liability.label}>
            <dt>{liability.label}</dt>
            <dd>{liability.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

PayrollCalculationLiabilities.propTypes = {
  liabilities: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};
