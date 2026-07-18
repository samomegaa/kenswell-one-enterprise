import PropTypes from 'prop-types';

export default function SectionStatusList({
  sections = [],
  onSelectSection,
}) {
  return (
    <div className="section-status-list">
      {sections.map((section) => (
        <button
          key={section.sectionId}
          type="button"
          className={
            `section-status-item ` +
            `section-status-item--${section.status}`
          }
          onClick={() =>
            onSelectSection?.(
              section.sectionId
            )
          }
        >
          <span>{section.title}</span>
          <strong>{section.score}%</strong>
          <small>
            {section.missing
              ? `${section.missing} missing`
              : 'Ready'}
          </small>
        </button>
      ))}
    </div>
  );
}

SectionStatusList.propTypes = {
  sections: PropTypes.array,
  onSelectSection: PropTypes.func,
};
