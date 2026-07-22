import PropTypes from 'prop-types';

export default function StaffologyWorkspaceState({
  title,
  message,
  tone = 'neutral',
}) {
  return (
    <div
      className={`staffology-workspace-state staffology-workspace-state--${tone}`}
      role="status"
      aria-live="polite"
    >
      {title ? (
        <strong className="staffology-workspace-state__title">
          {title}
        </strong>
      ) : null}
      <p className="staffology-workspace-state__message">
        {message}
      </p>
    </div>
  );
}

StaffologyWorkspaceState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  tone: PropTypes.oneOf([
    'neutral',
    'pending',
    'information',
  ]),
};
