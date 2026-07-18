import PropTypes from 'prop-types';

export default function MissingFieldList({
  fields = [],
  onSelectSection,
}) {
  if (fields.length === 0) {
    return (
      <p className="readiness-empty">
        No missing fields.
      </p>
    );
  }

  return (
    <ul className="missing-field-list">
      {fields.map((field) => (
        <li key={field.id}>
          <div>
            <strong>{field.label}</strong>
            <small>{field.sectionId}</small>
          </div>

          <button
            type="button"
            onClick={() =>
              onSelectSection?.(
                field.sectionId
              )
            }
          >
            Open section
          </button>
        </li>
      ))}
    </ul>
  );
}

MissingFieldList.propTypes = {
  fields: PropTypes.array,
  onSelectSection: PropTypes.func,
};
