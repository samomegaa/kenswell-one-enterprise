import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import FieldRenderer from './FieldRenderer';

function valueFor(employee, path) {
  return String(path)
    .split('.')
    .reduce(
      (value, key) => value?.[key],
      employee
    );
}

export default function SectionRenderer({
  section,
  employee,
  disabled = true,
  errors = {},
  onChange,
}) {
  return (
    <WorkspaceSection
      title={section.title}
      description={section.description}
    >
      <div className="enterprise-field-grid">
        {(section.fields || []).map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={valueFor(
              employee,
              field.providerBinding
            )}
            disabled={disabled}
            error={errors[field.id] || null}
            onChange={onChange}
          />
        ))}
      </div>

      {section.fields?.length === 0 && (
        <p>
          No fields are registered for this section.
        </p>
      )}
    </WorkspaceSection>
  );
}

SectionRenderer.propTypes = {
  section: PropTypes.object.isRequired,
  employee: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};
