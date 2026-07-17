import PropTypes from 'prop-types';

export default function WorkspaceTimeline({ events }) {
  if (!events.length) return <p>No timeline events yet.</p>;
  return (
    <ol className="workspace-timeline">
      {events.map((event) => (
        <li key={event.id}>
          <strong>{event.title}</strong>
          <time dateTime={event.occurredAt}>{event.displayTime || event.occurredAt}</time>
        </li>
      ))}
    </ol>
  );
}

WorkspaceTimeline.propTypes = { events: PropTypes.array.isRequired };
