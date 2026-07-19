import PropTypes from 'prop-types';

export default function StaffologyField({
  label,
  value,
  wide = false,
}) {
  const displayValue =
    value === undefined ||
    value === null ||
    value === ''
      ? '—'
      : String(value);

  return (
    <div
      className={
        wide
          ? 'staffology-field staffology-field--wide'
          : 'staffology-field'
      }
    >
      <dt>{label}</dt>
      <dd>{displayValue}</dd>
    </div>
  );
}

StaffologyField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  wide: PropTypes.bool,
};
