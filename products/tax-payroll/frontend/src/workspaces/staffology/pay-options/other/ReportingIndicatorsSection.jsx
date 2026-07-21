import PropTypes from 'prop-types';

import StaffologyField
  from '../../StaffologyField';

export default function ReportingIndicatorsSection({
  model,
}) {
  return (
    <section className="other-pay-section">
      <h3>Reporting indicators</h3>

      <dl className="staffology-field-grid">
        <StaffologyField
          label="Off-payroll worker"
          value={model.offPayrollWorker}
        />
        <StaffologyField
          label="Occupational pension"
          value={model.occupationalPension}
        />
        <StaffologyField
          label="Foreign tax credit"
          value={model.foreignTaxCredit}
        />
        <StaffologyField
          label="Expatriate"
          value={model.expatriate}
        />
      </dl>
    </section>
  );
}

ReportingIndicatorsSection.propTypes = {
  model: PropTypes.object.isRequired,
};
