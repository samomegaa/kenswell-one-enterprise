import PropTypes from 'prop-types';
import { WorkspaceCard, WorkspaceSection } from '../framework';
import { formatDate } from './employeeWorkspaceModel';

function Details({ title, values }) {
  return (
    <WorkspaceSection title={title}>
      <dl className="workspace-detail-grid">
        {values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value ?? '—'}</dd></div>)}
      </dl>
    </WorkspaceSection>
  );
}

Details.propTypes = { title: PropTypes.string.isRequired, values: PropTypes.array.isRequired };

export function SummaryPanel({ employee }) {
  return (
    <WorkspaceSection title="Employee summary" description="Canonical employee and payroll context.">
      <div className="workspace-card-grid">
        <WorkspaceCard label="Payroll code" value={employee.employment?.payrollCode} />
        <WorkspaceCard label="Client" value={employee.clientId} />
        <WorkspaceCard label="Employer" value={employee.employerId} />
        <WorkspaceCard label="Version" value={`v${employee.version}`} />
        <WorkspaceCard label="Updated" value={formatDate(employee.updatedAt)} />
      </div>
    </WorkspaceSection>
  );
}

export function EmploymentPanel({ employee }) {
  const x=employee.employment||{};
  return <Details title="Employment" values={[["Status",x.status],["Job title",x.jobTitle],["Department",x.department],["Cost centre",x.costCentre],["Start date",x.startDate],["Payroll code",x.payrollCode],["Director",x.isDirector?'Yes':'No']]} />;
}
export function PayrollPanel({ employee }) {
  const x=employee.payroll||{};
  return <Details title="Payroll" values={[["Pay frequency",x.payFrequency],["Pay schedule",x.payScheduleName],["Salary",x.salary],["Hourly rate",x.hourlyRate],["Basic pay",x.basicPay],["Normal hours",x.normalHours],["Payment method",x.paymentMethod]]} />;
}
export function TaxPanel({ employee }) {
  const x=employee.tax||{}, n=employee.nationalInsurance||{};
  return <Details title="Tax and National Insurance" values={[["Tax code",x.taxCode],["Tax basis",x.taxBasis],["Student loan",x.studentLoanPlan],["Postgraduate loan",x.postgraduateLoan?'Yes':'No'],["NI number",n.number],["NI category",n.category]]} />;
}
export function PensionPanel({ employee }) {
  const x=employee.pension||{};
  return <Details title="Pension" values={[["Auto-enrolment",x.autoEnrolmentStatus],["Worker category",x.workerCategory],["Scheme",x.schemeId],["Employee contribution",x.employeeContribution],["Employer contribution",x.employerContribution]]} />;
}
export function LeavePanel({ employee }) {
  const x=employee.leave||{};
  return <Details title="Leave" values={[["Holiday allowance",x.holidayAllowance],["Holiday taken",x.holidayTaken],["Holiday remaining",x.holidayRemaining],["Working pattern",x.workingPattern],["Open sickness",x.sicknessOpen?'Yes':'No'],["Statutory leave",x.statutoryLeaveType]]} />;
}
export function ProviderPanel({ employee }) {
  const x=employee.provider||{};
  return <Details title="Payroll provider" values={[["Provider",x.provider],["External employee ID",x.externalEmployeeId],["External employer ID",x.externalEmployerId],["Provider version",x.providerVersion],["Last synchronised",formatDate(x.lastSynchronisedAt)]]} />;
}

const employeeProp = { employee: PropTypes.object.isRequired };
SummaryPanel.propTypes=employeeProp; EmploymentPanel.propTypes=employeeProp; PayrollPanel.propTypes=employeeProp; TaxPanel.propTypes=employeeProp; PensionPanel.propTypes=employeeProp; LeavePanel.propTypes=employeeProp; ProviderPanel.propTypes=employeeProp;
