import PropTypes from 'prop-types';

import {
  TIMELINE_FILTERS,
} from '../timeline';

export default function ActivityTimelineFilters({
  filter,
  query,
  onFilterChange,
  onQueryChange,
}) {
  return (
    <div className="activity-timeline-filters">
      <select
        value={filter}
        onChange={(event) =>
          onFilterChange(event.target.value)
        }
      >
        {TIMELINE_FILTERS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        type="search"
        value={query}
        placeholder="Search activity or correlation ID"
        onChange={(event) =>
          onQueryChange(event.target.value)
        }
      />
    </div>
  );
}

ActivityTimelineFilters.propTypes = {
  filter: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};
