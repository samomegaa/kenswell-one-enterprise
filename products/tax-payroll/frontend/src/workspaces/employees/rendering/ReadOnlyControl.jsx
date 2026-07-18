import PropTypes from 'prop-types';

import {
  formatDisplayValue,
} from './valueFormatters';

export default function ReadOnlyControl({
  field,
  value,
}) {
  const display = formatDisplayValue(
    value,
    field.type
  );

  if (field.control === 'json') {
    return (
      <pre className="enterprise-field__json">
        {display}
      </pre>
    );
  }

  return (
    <output className="enterprise-field__output">
      {display}
    </output>
  );
}

ReadOnlyControl.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.any,
};
