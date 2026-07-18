import PropTypes from 'prop-types';

function normaliseStatus(status) {
  return String(status || 'unknown')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export default function ProviderStatusBadge({
  status,
}) {
  return (
    <span
      className={
        `provider-status-badge ` +
        `provider-status-badge--${normaliseStatus(status)}`
      }
    >
      {status || 'Unknown'}
    </span>
  );
}

ProviderStatusBadge.propTypes = {
  status: PropTypes.string,
};
