import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../../framework';

import PayItemSection from './PayItemSection';

export default function StaffologyAdditionsDeductionsPanel({
  model,
}) {
  return (
    <WorkspaceSection
      title="Additions & Deductions"
      description={
        'Read-only recurring pay items supplied by Staffology.'
      }
    >
      <div className="additions-deductions-layout">
        <PayItemSection
          title="Additions"
          collection={model.additions}
        />

        <PayItemSection
          title="Deductions"
          collection={model.deductions}
        />
      </div>
    </WorkspaceSection>
  );
}

StaffologyAdditionsDeductionsPanel.propTypes = {
  model: PropTypes.shape({
    additions: PropTypes.object.isRequired,
    deductions: PropTypes.object.isRequired,
  }).isRequired,
};
