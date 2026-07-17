import PropTypes from 'prop-types';
import PayrollRunField from './PayrollRunField';

export default function PayPeriodStep({
  run,
  schedules,
  errors,
  onChange,
}) {
  return (
    <div className="payroll-processing-grid">
      <PayrollRunField
        label="Pay schedule"
        name="payScheduleId"
        value={run.payScheduleId}
        error={errors.payScheduleId}
        onChange={onChange}
        options={schedules.map((schedule) => ({
          value: schedule.id,
          label: schedule.name,
        }))}
      />
      <PayrollRunField
        label="Period start"
        name="periodStart"
        value={run.periodStart}
        error={errors.periodStart}
        type="date"
        onChange={onChange}
      />
      <PayrollRunField
        label="Period end"
        name="periodEnd"
        value={run.periodEnd}
        error={errors.periodEnd}
        type="date"
        onChange={onChange}
      />
      <PayrollRunField
        label="Payment date"
        name="paymentDate"
        value={run.paymentDate}
        error={errors.paymentDate}
        type="date"
        onChange={onChange}
      />
    </div>
  );
}

PayPeriodStep.propTypes = {
  run: PropTypes.object.isRequired,
  schedules: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
