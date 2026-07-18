import PropTypes from 'prop-types';

export default function ProviderActions({
  onRefresh,
  onViewDiagnostics,
  onViewHistory,
  onPrepareSynchronisation,
}) {
  return (
    <div className="provider-actions">
      <button
        type="button"
        onClick={onRefresh}
      >
        Refresh status
      </button>

      <button
        type="button"
        onClick={onViewDiagnostics}
      >
        View diagnostics
      </button>

      <button
        type="button"
        onClick={onViewHistory}
      >
        View history
      </button>

      <button
        type="button"
        onClick={onPrepareSynchronisation}
      >
        Prepare synchronisation
      </button>
    </div>
  );
}

ProviderActions.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onViewDiagnostics: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
  onPrepareSynchronisation:
    PropTypes.func.isRequired,
};
