import PropTypes from 'prop-types';
import StaffologyWorkspaceState from '../../StaffologyWorkspaceState';
import { adaptStaffologyDepartments } from './adaptStaffologyDepartments';
import { createDepartmentPresentationModel } from './departmentPresentationModel';
import DepartmentCard from './DepartmentCard';
import './departments.css';

export default function StaffologyDepartmentsWorkspace({ employer }) {
  const model = createDepartmentPresentationModel(adaptStaffologyDepartments(employer));
  if (!model.available) return <StaffologyWorkspaceState title="Departments unavailable" message="Department information is not present in the current Staffology employer response." />;
  if (!model.items.length) return <StaffologyWorkspaceState title="No departments" message="No departments are recorded." tone="information" />;
  return (
    <section className="departments-workspace">
      <header><h2>Departments</h2><p>Read-only organisational departments supplied by Staffology.</p></header>
      <div className="organisation-collection-grid">
        {model.items.map((department) => <DepartmentCard key={department.id} department={department} />)}
      </div>
    </section>
  );
}

StaffologyDepartmentsWorkspace.propTypes = { employer: PropTypes.object.isRequired };
