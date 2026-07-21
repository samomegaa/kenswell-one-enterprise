import PropTypes from 'prop-types';

import StaffologyField
  from '../../StaffologyField';

export default function WorkingArrangementSection({
  model,
}) {
  return (
    <section className="other-pay-section">
      <h3>Working arrangement</h3>

      <dl className="staffology-field-grid">
        <StaffologyField
          label="Employment status"
          value={model.employmentStatus}
        />
        <StaffologyField
          label="Working pattern"
          value={model.workingPattern}
        />
        <StaffologyField
          label="Hours normally worked"
          value={model.hoursNormallyWorked}
        />
        <StaffologyField
          label="Irregular payment pattern"
          value={model.irregularPaymentPattern}
        />
      </dl>
    </section>
  );
}

WorkingArrangementSection.propTypes = {
  model: PropTypes.object.isRequired,
};
