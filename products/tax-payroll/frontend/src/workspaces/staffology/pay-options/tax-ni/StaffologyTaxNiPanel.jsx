import PropTypes from 'prop-types';
import { WorkspaceSection } from '../../../framework';
import TaxDetailsSection from './TaxDetailsSection';
import NationalInsuranceSection from './NationalInsuranceSection';
import LoanIndicatorsSection from './LoanIndicatorsSection';
import { createTaxNiPresentationModel } from './taxNiPresentationModel';

export default function StaffologyTaxNiPanel({ model }) {
  const presentation = createTaxNiPresentationModel(model);

  return (
    <WorkspaceSection
      title="Tax & NI"
      description="Read-only statutory payroll information supplied by Staffology."
    >
      <div className="tax-ni-layout">
        <TaxDetailsSection model={presentation} />
        <NationalInsuranceSection model={presentation} />
        <LoanIndicatorsSection model={presentation} />
      </div>
    </WorkspaceSection>
  );
}

StaffologyTaxNiPanel.propTypes = {
  model: PropTypes.object.isRequired,
};
