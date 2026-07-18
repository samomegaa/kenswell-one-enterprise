import PropTypes from 'prop-types';

function inputType(control) {
  const types = {
    email: 'email',
    telephone: 'tel',
    number: 'number',
    currency: 'number',
    percentage: 'number',
    date: 'date',
    datetime: 'datetime-local',
  };

  return types[control] || 'text';
}

export default function InputControl({
  field,
  value,
  disabled,
  onChange,
}) {
  return (
    <input
      id={field.id}
      name={field.id}
      type={inputType(field.control)}
      value={value ?? ''}
      placeholder={field.placeholder || ''}
      readOnly={field.readOnly}
      disabled={disabled}
      step={
        ['currency', 'percentage'].includes(
          field.control
        )
          ? '0.01'
          : undefined
      }
      onChange={(event) =>
        onChange?.(field, event.target.value)
      }
    />
  );
}

InputControl.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
