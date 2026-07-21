import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import StaffologyField
  from '../StaffologyField';

import {
  formatCurrency,
} from './regularPayFormatters';

export default function StaffologyRegularPayPanel({
  regularPay,
}) {
  return (
    <WorkspaceSection
      title="Regular Pay"
      description={
        'Read-only regular pay information supplied by Staffology.'
      }
    >
      <div className="regular-pay-layout">
        <section>
          <h3>Pay arrangement</h3>

          <dl className="staffology-field-grid">
            <StaffologyField
              label="Schedule"
              value={regularPay.schedule}
            />
            <StaffologyField
              label="Basis"
              value={regularPay.basis}
            />
            <StaffologyField
              label="Working pattern"
              value={regularPay.workingPattern}
            />
            <StaffologyField
              label="Pay code"
              value={regularPay.payCode}
            />
            <StaffologyField
              label="Pro-rata adjustments"
              value={regularPay.proRataAdjustments}
            />
          </dl>
        </section>

        <section>
          <h3>Pay amounts and rates</h3>

          <dl className="staffology-field-grid">
            <StaffologyField
              label="Monthly amount"
              value={formatCurrency(
                regularPay.monthlyAmount
              )}
            />
            <StaffologyField
              label="Annual salary"
              value={formatCurrency(
                regularPay.annualSalary
              )}
            />
            <StaffologyField
              label="Base hourly rate"
              value={formatCurrency(
                regularPay.baseHourlyRate
              )}
            />
            <StaffologyField
              label="Base daily rate"
              value={formatCurrency(
                regularPay.baseDailyRate
              )}
            />
          </dl>
        </section>
      </div>
    </WorkspaceSection>
  );
}

StaffologyRegularPayPanel.propTypes = {
  regularPay: PropTypes.object.isRequired,
};
