import PropTypes from 'prop-types';

export default function CommandHistoryCard({ commands }) {
  const history = commands.filter((command) =>
    ['completed', 'failed', 'rejected'].includes(command.status)
  );

  return (
    <section className="command-history-card">
      <header>
        <h3>Command history</h3>
        <strong>{history.length}</strong>
      </header>

      {history.length === 0 ? (
        <p>No completed commands recorded.</p>
      ) : (
        <ul>
          {history.map((command) => (
            <li key={command.id}>
              <span>{command.label}</span>
              <strong>{command.status}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

CommandHistoryCard.propTypes = {
  commands: PropTypes.arrayOf(PropTypes.object).isRequired,
};
