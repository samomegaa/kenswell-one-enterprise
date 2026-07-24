import PropTypes from 'prop-types';

export default function ProductNavigation({ items, activeId, onSelect }) {
  return (
    <aside className="product-navigation">
      <header className="product-navigation__brand">
        <span>Kenswell One</span>
        <strong>Payroll</strong>
        <small>Version 2</small>
      </header>
      <nav aria-label="Payroll product navigation">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeId
              ? 'product-navigation__item is-active'
              : 'product-navigation__item'}
            onClick={() => onSelect(item.id)}
          >
            <span>{item.label}</span>
            <small>{item.workspaces.length}</small>
          </button>
        ))}
      </nav>
    </aside>
  );
}

ProductNavigation.propTypes = {
  items: PropTypes.array.isRequired,
  activeId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
