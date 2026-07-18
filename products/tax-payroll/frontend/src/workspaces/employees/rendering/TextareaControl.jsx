import PropTypes from 'prop-types';

export default function TextareaControl({
  field,
  value,
  disabled,
  onChange,
}) {
  return (
    <textarea
      id={field.id}
      name={field.id}
      value={value ?? ''}
      placeholder={field.placeholder || ''}
      readOnly={field.readOnly}
      disabled={disabled}
      rows={4}
      onChange={(event) =>
        onChange?.(field, event.target.value)
      }
    />
  );
}

TextareaControl.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
