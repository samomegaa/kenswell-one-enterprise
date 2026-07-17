import PropTypes from 'prop-types';
import EmployeeField from './EmployeeField';

export default function IdentityStep({ draft, errors, onChange }) {
  const identity = draft.identity;

  return (
    <div className="employee-creation-grid">
      <EmployeeField
        label="Title"
        name="identity.title"
        value={identity.title}
        onChange={onChange}
      />
      <EmployeeField
        label="First name"
        name="identity.firstName"
        value={identity.firstName}
        error={errors['identity.firstName']}
        onChange={onChange}
      />
      <EmployeeField
        label="Last name"
        name="identity.lastName"
        value={identity.lastName}
        error={errors['identity.lastName']}
        onChange={onChange}
      />
      <EmployeeField
        label="Date of birth"
        name="identity.dateOfBirth"
        value={identity.dateOfBirth}
        type="date"
        onChange={onChange}
      />
      <EmployeeField
        label="Email"
        name="identity.email"
        value={identity.email}
        type="email"
        onChange={onChange}
      />
      <EmployeeField
        label="Telephone"
        name="identity.phone"
        value={identity.phone}
        type="tel"
        onChange={onChange}
      />
    </div>
  );
}

IdentityStep.propTypes = {
  draft: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
