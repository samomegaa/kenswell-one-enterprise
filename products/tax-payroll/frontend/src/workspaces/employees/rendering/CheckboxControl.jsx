import PropTypes from 'prop-types';

export default function CheckboxControl({
  field,
  value,
  disabled,
  onChange,
}) {
  return (
    <label className="enterprise-field__checkbox">
      <input
        id={field.id}
        name={field.id}
        type="checkbox"
        checked={Boolean(value)}
        disabled={disabled || field.readOnly}
        onChange={(event) =>
          onChange?.(field, event.target.checked)
        }
      />

      <span>Enabled</span>
    </label>
  );
}

CheckboxControl.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
