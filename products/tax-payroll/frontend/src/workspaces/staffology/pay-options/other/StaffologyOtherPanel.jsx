import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../../framework';

import PayrollControlsSection
  from './PayrollControlsSection';

import WorkingArrangementSection
  from './WorkingArrangementSection';

import ReportingIndicatorsSection
  from './ReportingIndicatorsSection';

import {
  createOtherPresentationModel,
} from './otherPresentationModel';

export default function StaffologyOtherPanel({
  model,
}) {
  const presentation =
    createOtherPresentationModel(model);

  return (
    <WorkspaceSection
      title="Other"
      description={
        'Read-only supplementary payroll settings supplied by Staffology.'
      }
    >
      <div className="other-pay-layout">
        <PayrollControlsSection
          model={presentation}
        />

        <WorkingArrangementSection
          model={presentation}
        />

        <ReportingIndicatorsSection
          model={presentation}
        />
      </div>
    </WorkspaceSection>
  );
}

StaffologyOtherPanel.propTypes = {
  model: PropTypes.object.isRequired,
};
