import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../../framework';

import StaffologyField
  from '../StaffologyField';

import {
  formatCurrency,
  formatDays,
  formatHours,
} from './regularPayFormatters';

export default function StaffologyRegularPayPanel({
  regularPay,
}) {
  return (
    <WorkspaceSection
      title="Regular Pay"
      description={
        'Read-only pay information supplied by Staffology.'
      }
    >
      <dl className="staffology-field-grid">
        <StaffologyField
          label="Employment type"
          value={regularPay.employmentType}
        />
        <StaffologyField
          label="Pay basis"
          value={regularPay.payBasis}
        />
        <StaffologyField
          label="Pay frequency"
          value={regularPay.payFrequency}
        />
        <StaffologyField
          label="Payroll frequency"
          value={regularPay.payrollFrequency}
        />
        <StaffologyField
          label="Annual salary"
          value={formatCurrency(
            regularPay.annualSalary
          )}
        />
        <StaffologyField
          label="Regular pay"
          value={formatCurrency(
            regularPay.regularPay
          )}
        />
        <StaffologyField
          label="Hourly rate"
          value={formatCurrency(
            regularPay.hourlyRate
          )}
        />
        <StaffologyField
          label="Daily rate"
          value={formatCurrency(
            regularPay.dailyRate
          )}
        />
        <StaffologyField
          label="Working pattern"
          value={regularPay.workingPattern}
        />
        <StaffologyField
          label="Normal hours"
          value={formatHours(
            regularPay.normalHours
          )}
        />
        <StaffologyField
          label="Normal days"
          value={formatDays(
            regularPay.normalDays
          )}
        />
        <StaffologyField
          label="Payroll code"
          value={regularPay.payrollCode}
        />
      </dl>
    </WorkspaceSection>
  );
}

StaffologyRegularPayPanel.propTypes = {
  regularPay: PropTypes.object.isRequired,
};
