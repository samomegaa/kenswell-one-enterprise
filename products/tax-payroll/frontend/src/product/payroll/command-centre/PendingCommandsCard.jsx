import PropTypes from 'prop-types';

export default function PendingCommandsCard({
  commands,
  onApprove,
  onReject,
  onExecute,
}) {
  const pending = commands.filter((command) =>
    ['awaiting-approval', 'approved'].includes(command.status)
  );

  return (
    <section className="pending-commands-card">
      <header>
        <h3>Pending commands</h3>
        <strong>{pending.length}</strong>
      </header>

      {pending.length === 0 ? (
        <p>No pending operational commands.</p>
      ) : pending.map((command) => (
        <article key={command.id}>
          <div>
            <strong>{command.label}</strong>
            <span>{command.status}</span>
          </div>

          <div className="pending-commands-card__actions">
            {command.status === 'awaiting-approval' && (
              <>
                <button
                  type="button"
                  onClick={() => onApprove(command)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => onReject(command)}
                >
                  Reject
                </button>
              </>
            )}

            {command.status === 'approved' && (
              <button
                type="button"
                onClick={() => onExecute(command)}
              >
                Execute
              </button>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

PendingCommandsCard.propTypes = {
  commands: PropTypes.arrayOf(PropTypes.object).isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onExecute: PropTypes.func.isRequired,
};
