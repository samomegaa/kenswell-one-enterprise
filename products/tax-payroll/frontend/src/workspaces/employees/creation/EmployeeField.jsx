import PropTypes from 'prop-types';

export default function EmployeeField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  options,
  ...inputProps
}) {
  const id = `employee-${name.replaceAll('.', '-')}`;

  return (
    <label className="employee-creation-field" htmlFor={id}>
      <span>{label}</span>

      {options ? (
        <select
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          {...inputProps}
        >
          {options.map(({ value: optionValue, label: optionLabel }) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          {...inputProps}
        />
      )}

      {error && <small role="alert">{error}</small>}
    </label>
  );
}

EmployeeField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};
