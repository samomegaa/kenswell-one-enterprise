import PropTypes from 'prop-types';

export default function PayrollRunField({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  options,
  ...props
}) {
  const id = `payroll-run-${name}`;

  return (
    <label className="payroll-run-field" htmlFor={id}>
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
          <option value="">Select</option>
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

PayrollRunField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};
