import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import StaffologyWorkspaceState
  from '../StaffologyWorkspaceState';

import PensionCard from './PensionCard';

import {
  createPensionPresentationModel,
} from './pensionPresentationModel';

export default function StaffologyPensionPanel({
  model,
}) {
  const presentation =
    createPensionPresentationModel(model);

  let content;

  if (!presentation.available) {
    content = (
      <StaffologyWorkspaceState
        title="Pension unavailable"
        message={
          'Pension information is not present in the current Staffology employee response.'
        }
      />
    );
  } else if (!presentation.items.length) {
    content = (
      <StaffologyWorkspaceState
        title="No pension arrangements"
        message="No pension arrangements are recorded."
        tone="information"
      />
    );
  } else {
    content = (
      <div className="pension-list">
        {presentation.items.map(
          (pension, index) => (
            <PensionCard
              key={pension.id || index}
              pension={pension}
              index={index}
            />
          )
        )}
      </div>
    );
  }

  return (
    <WorkspaceSection
      title="Pension"
      description={
        'Read-only employee pension information supplied by Staffology.'
      }
    >
      {content}
    </WorkspaceSection>
  );
}

StaffologyPensionPanel.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
