import PropTypes from 'prop-types';

export default function WorkspaceSection({ title, description, children }) {
  return (
    <section className="workspace-section">
      <header><h2>{title}</h2>{description && <p>{description}</p>}</header>
      <div className="workspace-section__body">{children}</div>
    </section>
  );
}

WorkspaceSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
};
