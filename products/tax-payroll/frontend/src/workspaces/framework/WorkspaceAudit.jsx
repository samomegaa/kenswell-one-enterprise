import PropTypes from 'prop-types';

export default function WorkspaceAudit({ entries }) {
  if (!entries.length) return <p>No audit entries available.</p>;
  return (
    <div className="workspace-audit">
      {entries.map((entry) => (
        <article key={entry.id}>
          <strong>{entry.action}</strong>
          <span>{entry.actor || 'System'}</span>
          <time dateTime={entry.occurredAt}>{entry.displayTime || entry.occurredAt}</time>
        </article>
      ))}
    </div>
  );
}

WorkspaceAudit.propTypes = { entries: PropTypes.array.isRequired };
