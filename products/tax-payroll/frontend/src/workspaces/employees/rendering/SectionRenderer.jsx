import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import {
  getPathValue,
} from '../editing/workspaceDraftValues';

import {
  isFieldVisible,
} from '../visibility';

import FieldRenderer from './FieldRenderer';

export default function SectionRenderer({
  section,
  employee,
  disabled = true,
  errors = {},
  onChange,
}) {
  const fields = (section.fields || []).filter(
    (field) =>
      isFieldVisible(field, employee)
  );

  return (
    <WorkspaceSection
      title={section.title}
      description={section.description}
    >
      <div className="enterprise-field-grid">
        {fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            value={getPathValue(
              employee,
              field.providerBinding
            )}
            disabled={disabled}
            error={errors[field.id] || null}
            onChange={(nextField, value) =>
              onChange?.(
                nextField,
                value,
                section.id
              )
            }
          />
        ))}
      </div>

      {fields.length === 0 && (
        <p>
          No fields are visible for this section.
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
