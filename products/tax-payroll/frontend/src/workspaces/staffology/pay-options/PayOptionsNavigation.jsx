import PropTypes from 'prop-types';

import {
  PAY_OPTION_SECTIONS,
} from './payOptionSections';

export default function PayOptionsNavigation({
  activeId,
  onSelect,
}) {
  return (
    <nav
      className="pay-options-navigation"
      aria-label="Staffology Pay Options sections"
    >
      {PAY_OPTION_SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={
            section.id === activeId
              ? 'pay-options-navigation__item is-active'
              : 'pay-options-navigation__item'
          }
          aria-current={
            section.id === activeId
              ? 'page'
              : undefined
          }
          onClick={() => onSelect(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
}

PayOptionsNavigation.propTypes = {
  activeId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
