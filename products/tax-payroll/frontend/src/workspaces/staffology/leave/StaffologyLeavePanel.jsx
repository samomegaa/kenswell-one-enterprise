import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import LeaveSection from './LeaveSection';

import {
  createLeavePresentationModel,
} from './leavePresentationModel';

export default function StaffologyLeavePanel({
  model,
}) {
  const presentation =
    createLeavePresentationModel(model);

  return (
    <WorkspaceSection
      title="Leave"
      description={
        'Read-only employee leave information supplied by Staffology.'
      }
    >
      <LeaveSection
        model={presentation}
      />
    </WorkspaceSection>
  );
}

StaffologyLeavePanel.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
