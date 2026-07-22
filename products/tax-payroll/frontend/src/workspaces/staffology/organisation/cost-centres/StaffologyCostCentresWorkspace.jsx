import PropTypes from 'prop-types';
import StaffologyWorkspaceState from '../../StaffologyWorkspaceState';
import { adaptStaffologyCostCentres } from './adaptStaffologyCostCentres';
import { createCostCentrePresentationModel } from './costCentrePresentationModel';
import CostCentreCard from './CostCentreCard';
import './cost-centres.css';

export default function StaffologyCostCentresWorkspace({ employer }) {
  const model = createCostCentrePresentationModel(adaptStaffologyCostCentres(employer));
  if (!model.available) return <StaffologyWorkspaceState title="Cost centres unavailable" message="Cost centre information is not present in the current Staffology employer response." />;
  if (!model.items.length) return <StaffologyWorkspaceState title="No cost centres" message="No cost centres are recorded." tone="information" />;
  return (
    <section className="cost-centres-workspace">
      <header><h2>Cost Centres</h2><p>Read-only payroll cost centres supplied by Staffology.</p></header>
      <div className="organisation-collection-grid">
        {model.items.map((costCentre) => <CostCentreCard key={costCentre.id} costCentre={costCentre} />)}
      </div>
    </section>
  );
}

StaffologyCostCentresWorkspace.propTypes = { employer: PropTypes.object.isRequired };
