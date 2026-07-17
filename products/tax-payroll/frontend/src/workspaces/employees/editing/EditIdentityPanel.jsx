import PropTypes from 'prop-types';
import EmployeeEditField from './EmployeeEditField';

export default function EditIdentityPanel({ employee, errors, onChange }) {
  const identity = employee.identity || {};

  return (
    <div className="employee-edit-grid">
      <EmployeeEditField
        label="First name"
        name="identity.firstName"
        value={identity.firstName}
        error={errors['identity.firstName']}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Last name"
        name="identity.lastName"
        value={identity.lastName}
        error={errors['identity.lastName']}
        onChange={onChange}
      />
      <EmployeeEditField
        label="Date of birth"
        name="identity.dateOfBirth"
        value={identity.dateOfBirth}
        type="date"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Email"
        name="identity.email"
        value={identity.email}
        type="email"
        onChange={onChange}
      />
      <EmployeeEditField
        label="Telephone"
        name="identity.phone"
        value={identity.phone}
        type="tel"
        onChange={onChange}
      />
    </div>
  );
}

EditIdentityPanel.propTypes = {
  employee: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
