import PropTypes from 'prop-types';

import LeaveTable from './LeaveTable';

export default function LeaveSection({
  model,
}) {
  if (!model.available) {
    return (
      <p className="leave-state">
        Leave information is not present in the
        current Staffology employee response.
      </p>
    );
  }

  if (!model.items.length) {
    return (
      <p className="leave-state">
        No leave records are recorded.
      </p>
    );
  }

  return (
    <LeaveTable items={model.items} />
  );
}

LeaveSection.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
