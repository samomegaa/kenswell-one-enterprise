import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

export default function WorkspaceSectionSummary({
  section,
}) {
  return (
    <WorkspaceSection title={section.title}>
      <div className="enterprise-section-summary">
        <p>{section.description}</p>

        <dl>
          <div>
            <dt>Registered fields</dt>
            <dd>{section.fields?.length || 0}</dd>
          </div>

          <div>
            <dt>Readiness contribution</dt>
            <dd>
              {(section.readiness || []).join(', ') ||
                'Informational'}
            </dd>
          </div>
        </dl>

        <p className="enterprise-section-summary__notice">
          Field controls will be connected in RC1-C.
        </p>
      </div>
    </WorkspaceSection>
  );
}

WorkspaceSectionSummary.propTypes = {
  section: PropTypes.object.isRequired,
};
