import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../framework';

import StaffologyField from './StaffologyField';

function EmploymentGroup({
  title,
  children,
}) {
  return (
    <section className="staffology-employment-group">
      <h3>{title}</h3>

      <dl className="staffology-field-grid">
        {children}
      </dl>
    </section>
  );
}

EmploymentGroup.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default function StaffologyEmploymentPanel({
  employment,
}) {
  return (
    <WorkspaceSection
      title="Employment"
      description={
        'Read-only employment information supplied by Staffology.'
      }
    >
      <div className="staffology-employment">
        <EmploymentGroup title="Employment overview">
          <StaffologyField
            label="Status"
            value={employment.status}
          />
          <StaffologyField
            label="Job title"
            value={employment.jobTitle}
          />
          <StaffologyField
            label="Workplace postcode"
            value={employment.workplacePostcode}
          />
          <StaffologyField
            label="Start date"
            value={employment.startDate}
          />
          <StaffologyField
            label="Continuous start date"
            value={employment.continuousStartDate}
          />
          <StaffologyField
            label="Payroll code"
            value={employment.payrollCode}
          />
          <StaffologyField
            label="Declaration"
            value={employment.declaration}
          />
          <StaffologyField
            label="Payroll ID change"
            value={employment.payrollIdChange}
          />
          <StaffologyField
            label="On hold"
            value={employment.onHold}
          />
        </EmploymentGroup>

        <EmploymentGroup title="Director and NI settings">
          <StaffologyField
            label="Director"
            value={employment.isDirector}
          />
          <StaffologyField
            label="Start of directorship"
            value={employment.directorshipStartDate}
          />
          <StaffologyField
            label="End of directorship"
            value={employment.directorshipEndDate}
          />
          <StaffologyField
            label="Alternative NI method"
            value={employment.alternativeNiMethod}
          />
        </EmploymentGroup>

        <EmploymentGroup title="Employment declarations">
          <StaffologyField
            label="Right to work checked"
            value={employment.rightToWorkChecked}
          />
          <StaffologyField
            label="Works in a Freeport"
            value={employment.worksInFreeport}
          />
          <StaffologyField
            label="Works in an Investment Zone"
            value={employment.worksInInvestmentZone}
          />
          <StaffologyField
            label="Veteran"
            value={employment.isVeteran}
          />
          <StaffologyField
            label="Employee has left"
            value={employment.hasLeft}
          />
          <StaffologyField
            label="Seconded from overseas employer"
            value={employment.secondedFromOverseas}
          />
          <StaffologyField
            label="Registered pension income"
            value={
              employment.receivesRegisteredPensionIncome
            }
          />
          <StaffologyField
            label="CIS subcontractor"
            value={employment.cisSubcontractor}
          />
          <StaffologyField
            label="Apprentice"
            value={employment.apprentice}
          />
          <StaffologyField
            label="On furlough"
            value={employment.furlough}
          />
        </EmploymentGroup>
      </div>
    </WorkspaceSection>
  );
}

StaffologyEmploymentPanel.propTypes = {
  employment: PropTypes.object.i
};
