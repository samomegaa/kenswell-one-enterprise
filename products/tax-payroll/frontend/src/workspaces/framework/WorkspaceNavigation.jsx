import PropTypes from 'prop-types';

export default function WorkspaceNavigation({ items, activeId, onSelect }) {
  return (
    <nav className="workspace-navigation" aria-label="Workspace sections">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className={active ? 'is-active' : ''}
            aria-current={active ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}

WorkspaceNavigation.propTypes = {
  items: PropTypes.array.isRequired,
  activeId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
