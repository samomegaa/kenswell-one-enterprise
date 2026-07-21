import PropTypes from 'prop-types';
import StaffologyField from '../../StaffologyField';

export default function LoanIndicatorsSection({ model }) {
  return (
    <section className="tax-ni-section">
      <h3>Student and postgraduate loans</h3>
      <dl className="staffology-field-grid">
        <StaffologyField label="Student loan" value={model.studentLoan} />
        <StaffologyField label="Student loan plan" value={model.studentLoanPlan} />
        <StaffologyField label="Postgraduate loan" value={model.postgraduateLoan} />
        <StaffologyField label="Postgraduate loan start" value={model.postgraduateLoanStart} />
      </dl>
    </section>
  );
}

LoanIndicatorsSection.propTypes = { model: PropTypes.object.isRequired };
