import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../framework';

import StaffologyWorkspaceState
  from './StaffologyWorkspaceState';

export default function StaffologySectionPending({
  title,
}) {
  return (
    <WorkspaceSection
      title={title}
      description={
        'This employee workspace is reserved for a dedicated Staffology integration release.'
      }
    >
      <StaffologyWorkspaceState
        title={`${title} pending`}
        message={
          'Staffology data for this section has not yet been connected. Existing employee data is unchanged.'
        }
        tone="pending"
      />
    </WorkspaceSection>
  );
}

StaffologySectionPending.propTypes = {
  title: PropTypes.string.isRequired,
};
