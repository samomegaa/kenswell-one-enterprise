import PropTypes from 'prop-types';

import ActivityTimelineItem from './ActivityTimelineItem';

export default function ActivityTimeline({ entries }) {
  if (entries.length === 0) {
    return (
      <div className="activity-timeline-empty">
        No operational activity matches this view.
      </div>
    );
  }

  return (
    <ol className="activity-timeline">
      {entries.map((entry) => (
        <ActivityTimelineItem
          key={entry.id}
          entry={entry}
        />
      ))}
    </ol>
  );
}

ActivityTimeline.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
};
