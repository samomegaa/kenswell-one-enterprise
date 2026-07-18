import PropTypes from 'prop-types';

import FieldMeta from './FieldMeta';

import {
  resolveControl,
} from './controlRegistry';

export default function FieldRenderer({
  field,
  value,
  disabled = true,
  error = null,
  onChange,
}) {
  const Control = resolveControl(field.control);

  const required =
    field.requiredFor?.length > 0;

  return (
    <div
      className={[
        'enterprise-field',
        required
          ? 'enterprise-field--required'
          : '',
        error
          ? 'enterprise-field--error'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label htmlFor={field.id}>
        {field.label}

        {required && (
          <span
            className="enterprise-field__required"
            aria-label="Required"
          >
            *
          </span>
        )}
      </label>

      <Control
        field={field}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />

      <FieldMeta field={field} />

      {error && (
        <p
          className="enterprise-field__error"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

FieldRenderer.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
};
