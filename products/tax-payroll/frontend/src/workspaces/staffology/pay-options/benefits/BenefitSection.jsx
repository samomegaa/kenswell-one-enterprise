import PropTypes from 'prop-types';

import BenefitTable from './BenefitTable';

export default function BenefitSection({
  model,
}) {
  if (!model.available) {
    return (
      <p className="benefit-state">
        Benefit information is not present in the
        current Staffology employee response.
      </p>
    );
  }

  if (!model.items.length) {
    return (
      <p className="benefit-state">
        No benefits are recorded.
      </p>
    );
  }

  return (
    <BenefitTable items={model.items} />
  );
}

BenefitSection.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
