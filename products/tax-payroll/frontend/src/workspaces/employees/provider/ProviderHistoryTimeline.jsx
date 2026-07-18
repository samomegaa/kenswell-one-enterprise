import PropTypes from 'prop-types';

export default function ProviderHistoryTimeline({
  history = [],
}) {
  if (!history.length) {
    return (
      <p className="provider-empty-state">
        No synchronisation history.
      </p>
    );
  }

  return (
    <ol className="provider-history-timeline">
      {history.map((entry, index) => (
        <li
          key={
            entry.id ||
            `${entry.occurredAt}-${index}`
          }
        >
          <span
            className="provider-history-timeline__marker"
            aria-hidden="true"
          />

          <div>
            <strong>
              {entry.operation ||
                entry.event ||
                'Synchronisation event'}
            </strong>

            <p>
              {entry.outcome ||
                entry.message ||
                'Completed'}
            </p>

            <small>
              {entry.occurredAt ||
                entry.completedAt ||
                'Unknown time'}
              {entry.initiatedBy
                ? ` · ${entry.initiatedBy}`
                : ''}
            </small>
          </div>
        </li>
      ))}
    </ol>
  );
}

ProviderHistoryTimeline.propTypes = {
  history: PropTypes.array,
};
