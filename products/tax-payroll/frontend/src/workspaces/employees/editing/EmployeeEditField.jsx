import PropTypes from 'prop-types';

export default function EmployeeEditField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  options,
  ...props
}) {
  const id = `employee-edit-${name.replaceAll('.', '-')}`;

  return (
    <label className="employee-edit-field" htmlFor={id}>
      <span>{label}</span>

      {options ? (
        <select
          id={id}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
          {...props}
        />
      )}

      {error && <small role="alert">{error}</small>}
    </label>
  );
}

EmployeeEditField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};
