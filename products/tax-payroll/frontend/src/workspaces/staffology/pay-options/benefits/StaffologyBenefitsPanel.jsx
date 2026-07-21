import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../../framework';

import BenefitSection from './BenefitSection';

import {
  createBenefitPresentationModel,
} from './benefitPresentationModel';

export default function StaffologyBenefitsPanel({
  model,
}) {
  const presentation =
    createBenefitPresentationModel(model);

  return (
    <WorkspaceSection
      title="Benefits"
      description={
        'Read-only employee benefit information supplied by Staffology.'
      }
    >
      <BenefitSection
        model={presentation}
      />
    </WorkspaceSection>
  );
}

StaffologyBenefitsPanel.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
