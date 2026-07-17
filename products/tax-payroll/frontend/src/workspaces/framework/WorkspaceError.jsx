import PropTypes from 'prop-types';

export default function WorkspaceError({ message, onRetry }) {
  return (
    <section className="workspace-error" role="alert">
      <h2>Workspace unavailable</h2>
      <p>{message}</p>
      {onRetry && <button type="button" onClick={onRetry}>Try again</button>}
    </section>
  );
}

WorkspaceError.propTypes = { message: PropTypes.string.isRequired, onRetry: PropTypes.func };
