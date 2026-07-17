import PropTypes from 'prop-types';

export default function WorkspaceLayout({ header, navigation, children }) {
  return (
    <section className="workspace-layout" data-workspace-layout>
      {header && <div>{header}</div>}
      {navigation && <div>{navigation}</div>}
      <main className="workspace-layout__content">{children}</main>
    </section>
  );
}

WorkspaceLayout.propTypes = {
  header: PropTypes.node,
  navigation: PropTypes.node,
  children: PropTypes.node.isRequired,
};
