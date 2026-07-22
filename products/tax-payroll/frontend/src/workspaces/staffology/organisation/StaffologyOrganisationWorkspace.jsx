import PropTypes from 'prop-types';
import StaffologyWorkspaceState from '../StaffologyWorkspaceState';
import { adaptStaffologyOrganisation } from './adaptStaffologyOrganisation';
import { createOrganisationPresentationModel } from './organisationPresentationModel';
import OrganisationSummaryCard from './OrganisationSummaryCard';
import OrganisationDetailsSection from './OrganisationDetailsSection';
import './organisation.css';
export default function StaffologyOrganisationWorkspace({ employer, onBack }) {
  const model = createOrganisationPresentationModel(adaptStaffologyOrganisation(employer));
  if (!model.available) return <main className="staffology-organisation-workspace"><button type="button" onClick={onBack}>Back to employees</button><StaffologyWorkspaceState title="Organisation unavailable" message="Organisation information is not present in the current Staffology employer response." /></main>;
  return <main className="staffology-organisation-workspace"><div className="organisation-toolbar"><button type="button" onClick={onBack}>Back to employees</button></div><OrganisationSummaryCard model={model}/><OrganisationDetailsSection title="Organisation identity" fields={model.identity}/><OrganisationDetailsSection title="Payroll configuration" fields={model.payroll}/><OrganisationDetailsSection title="Administration" fields={model.administration}/></main>;
}
StaffologyOrganisationWorkspace.propTypes = { employer: PropTypes.object.isRequired, onBack: PropTypes.func.isRequired };
