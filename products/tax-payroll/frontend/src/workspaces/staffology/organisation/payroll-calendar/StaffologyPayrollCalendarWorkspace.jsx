import PropTypes from 'prop-types';

import StaffologyWorkspaceState
  from '../../StaffologyWorkspaceState';

import {
  adaptStaffologyPayrollCalendar,
} from './adaptStaffologyPayrollCalendar';

import {
  createPayrollCalendarPresentationModel,
} from './payrollCalendarPresentationModel';

import PayrollPeriodCard
  from './PayrollPeriodCard';

import './payroll-calendar.css';

export default function StaffologyPayrollCalendarWorkspace({
  employer,
}) {
  const model =
    createPayrollCalendarPresentationModel(
      adaptStaffologyPayrollCalendar(employer)
    );

  if (!model.available) {
    return (
      <StaffologyWorkspaceState
        title="Payroll calendar unavailable"
        message={
          'Payroll calendar information is not present in the current Staffology employer response.'
        }
      />
    );
  }

  if (!model.items.length) {
    return (
      <StaffologyWorkspaceState
        title="No payroll periods"
        message="No payroll periods are recorded."
        tone="information"
      />
    );
  }

  return (
    <section className="payroll-calendar-workspace">
      <header>
        <h2>Payroll Calendar</h2>
        <p>
          Read-only payroll periods and processing
          dates supplied by Staffology.
        </p>
      </header>

      <div className="organisation-collection-grid">
        {model.items.map((period) => (
          <PayrollPeriodCard
            key={period.id}
            period={period}
          />
        ))}
      </div>
    </section>
  );
}

StaffologyPayrollCalendarWorkspace.propTypes = {
  employer: PropTypes.object.isRequired,
};
