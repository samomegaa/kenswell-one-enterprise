import PropTypes from 'prop-types';

export default function WorkspaceHeader({ title, subtitle, status, metadata = [], actions }) {
  return (
    <header className="workspace-header">
      <div>
        <div className="workspace-header__title-row">
          <h1>{title}</h1>
          {status && <span className="workspace-status">{status}</span>}
        </div>
        {subtitle && <p>{subtitle}</p>}
        {metadata.length > 0 && (
          <dl className="workspace-header__metadata">
            {metadata.map(({ label, value }) => (
              <div key={label}><dt>{label}</dt><dd>{value || '—'}</dd></div>
            ))}
          </dl>
        )}
      </div>
      {actions && <div>{actions}</div>}
    </header>
  );
}

WorkspaceHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  status: PropTypes.string,
  metadata: PropTypes.array,
  actions: PropTypes.node,
};
