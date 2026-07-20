import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

export default function PayOptionReserved({
  title,
}) {
  return (
    <WorkspaceSection title={title}>
      <div className="staffology-section-pending">
        <strong>{title}</strong>
        <p>
          This Staffology Pay Options section is reserved
          for its dedicated RC2-E sub-release.
        </p>
      </div>
    </WorkspaceSection>
  );
}

PayOptionReserved.propTypes = {
  title: PropTypes.string.isRequired,
};
