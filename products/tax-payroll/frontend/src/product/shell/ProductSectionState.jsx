import PropTypes from 'prop-types';

const label = (workspace) => ({
  available: 'Workspace available',
  foundation: 'Foundation present',
  planned: 'Planned',
}[workspace.availability] || 'Registered');

export default function ProductSectionState({ section }) {
  return (
    <section className="product-section-state">
      <header>
        <p className="product-section-state__eyebrow">
          Staffology operational product
        </p>
        <h1>{section.label}</h1>
        <p>
          This section is registered in the Version 2 product foundation.
        </p>
      </header>
      <div className="product-section-state__grid">
        {section.workspaces.map((workspace) => (
          <article key={workspace.id}>
            <span>{label(workspace)}</span>
            <h2>{workspace.label}</h2>
            <p>{workspace.capability}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

ProductSectionState.propTypes = {
  section: PropTypes.shape({
    label: PropTypes.string.isRequired,
    workspaces: PropTypes.array.isRequired,
  }).isRequired,
};
