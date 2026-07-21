import PropTypes from 'prop-types';
import { WorkspaceSection } from '../../../framework';
import StaffologyField from '../../StaffologyField';
import { formatTaxNiBoolean, formatTaxNiMoney } from './taxNiFormatters';

export default function StaffologyTaxNiPanel({ model }) {
  return (
    <WorkspaceSection
      title="Tax & NI"
      description="Read-only statutory payroll information supplied by Staffology."
    >
      <div className="tax-ni-layout">
        <section className="tax-ni-section">
          <h3>Income Tax</h3>
          <dl className="staffology-field-grid">
            <StaffologyField label="Tax code" value={model.taxCode} />
            <StaffologyField label="Tax basis" value={model.taxBasis} />
            <StaffologyField label="Tax regime" value={model.taxRegime} />
            <StaffologyField label="Starter declaration" value={model.starterDeclaration} />
            <StaffologyField label="Previous taxable pay" value={formatTaxNiMoney(model.previousTaxablePay)} />
            <StaffologyField label="Previous tax paid" value={formatTaxNiMoney(model.previousTaxPaid)} />
          </dl>
        </section>

        <section className="tax-ni-section">
          <h3>National Insurance</h3>
          <dl className="staffology-field-grid">
            <StaffologyField label="NI category" value={model.niCategory} />
            <StaffologyField label="NI number" value={model.niNumber} />
            <StaffologyField label="Director" value={formatTaxNiBoolean(model.director)} />
            <StaffologyField label="Alternative NI method" value={formatTaxNiBoolean(model.alternativeNiMethod)} />
            <StaffologyField label="Defer National Insurance" value={formatTaxNiBoolean(model.deferNationalInsurance)} />
          </dl>
        </section>

        <section className="tax-ni-section">
          <h3>Student and postgraduate loans</h3>
          <dl className="staffology-field-grid">
            <StaffologyField label="Student loan" value={formatTaxNiBoolean(model.studentLoan)} />
            <StaffologyField label="Student loan plan" value={model.studentLoanPlan} />
            <StaffologyField label="Postgraduate loan" value={formatTaxNiBoolean(model.postgraduateLoan)} />
          </dl>
        </section>
      </div>
    </WorkspaceSection>
  );
}

StaffologyTaxNiPanel.propTypes = {
  model: PropTypes.object.isRequired,
};
