import PropTypes from 'prop-types';

export default function FieldMeta({ field }) {
  const readiness =
    field.requiredFor?.length
      ? field.requiredFor.join(', ')
      : null;

  if (!field.helpText && !readiness) {
    return null;
  }

  return (
    <div className="enterprise-field__meta">
      {field.helpText && <small>{field.helpText}</small>}

      {readiness && (
        <small>
          Required for: {readiness}
        </small>
      )}
    </div>
  );
}

FieldMeta.propTypes = {
  field: PropTypes.object.isRequired,
};
