import PropTypes from 'prop-types';

export default function WorkspaceCard({ label, value }) {
  return (
    <article className="workspace-card">
      <span>{label}</span>
      <strong>{value ?? '—'}</strong>
    </article>
  );
}

WorkspaceCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
};
