import PropTypes from 'prop-types';
import LoanTable from './LoanTable';

export default function LoanSection({ model }) {
  if (!model.available) {
    return (
      <p className="loan-state">
        Loan information is not present in the current Staffology employee response.
      </p>
    );
  }

  if (!model.items.length) {
    return <p className="loan-state">No loans are recorded.</p>;
  }

  return <LoanTable items={model.items} />;
}

LoanSection.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
