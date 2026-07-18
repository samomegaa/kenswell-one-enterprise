import PropTypes from 'prop-types';

export default function SelectControl({
  field,
  value,
  disabled,
  onChange,
}) {
  return (
    <select
      id={field.id}
      name={field.id}
      value={value ?? ''}
      disabled={disabled || field.readOnly}
      onChange={(event) =>
        onChange?.(field, event.target.value)
      }
    >
      <option value="">Select…</option>

      {(field.options || []).map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

SelectControl.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
