import PropTypes from 'prop-types';

import StaffologyField
  from '../../StaffologyField';

export default function PayrollControlsSection({
  model,
}) {
  return (
    <section className="other-pay-section">
      <h3>Payroll controls</h3>

      <dl className="staffology-field-grid">
        <StaffologyField
          label="Payroll code"
          value={model.payrollCode}
        />
        <StaffologyField
          label="Payment method"
          value={model.paymentMethod}
        />
        <StaffologyField
          label="On hold"
          value={model.onHold}
        />
        <StaffologyField
          label="Exclude from payroll"
          value={model.excludeFromPayroll}
        />
      </dl>
    </section>
  );
}

PayrollControlsSection.propTypes = {
  model: PropTypes.object.isRequired,
};
