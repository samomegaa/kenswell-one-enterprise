import PropTypes from 'prop-types';
import { WorkspaceSection } from '../../../framework';
import LoanSection from './LoanSection';

export default function StaffologyLoansPanel({ model }) {
  return (
    <WorkspaceSection
      title="Loans"
      description="Read-only employee loan information supplied by Staffology."
    >
      <LoanSection model={model} />
    </WorkspaceSection>
  );
}

StaffologyLoansPanel.propTypes = {
  model: PropTypes.shape({
    available: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
  }).isRequired,
};
