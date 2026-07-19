import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../framework';

export default function StaffologySectionPending({
  title,
}) {
  return (
    <WorkspaceSection title={title}>
      <div className="staffology-section-pending">
        <strong>{title}</strong>
        <p>
          This Staffology section is reserved and will be
          connected to its API data in the corresponding
          RC2-C sub-release.
        </p>
      </div>
    </WorkspaceSection>
  );
}

StaffologySectionPending.propTypes = {
  title: PropTypes.string.isRequired,
};
