import PropTypes from 'prop-types';

export default function ActivityTimelineItem({ entry }) {
  return (
    <li className="activity-timeline-item">
      <div className="activity-timeline-item__marker" />

      <article>
        <header>
          <div>
            <span>{entry.type}</span>
            <h3>{entry.title}</h3>
          </div>
          <strong>{entry.status}</strong>
        </header>

        <p>{entry.message}</p>

        <footer>
          <time dateTime={entry.occurredAt}>
            {formatDate(entry.occurredAt)}
          </time>

          {entry.correlationId && (
            <code>{entry.correlationId}</code>
          )}
        </footer>
      </article>
    </li>
  );
}

function formatDate(value) {
  if (!value) return 'Timestamp unavailable';

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

ActivityTimelineItem.propTypes = {
  entry: PropTypes.object.isRequired,
};
