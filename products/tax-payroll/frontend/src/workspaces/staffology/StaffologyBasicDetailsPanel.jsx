import PropTypes from 'prop-types';

import {
  WorkspaceSection,
} from '../framework';

import StaffologyField from './StaffologyField';

export default function StaffologyBasicDetailsPanel({
  employee,
}) {
  const address = employee.address || {};

  return (
    <WorkspaceSection
      title="Basic Details"
      description={
        'Read-only employee information supplied by Staffology.'
      }
    >
      <div className="staffology-basic-details">
        <section>
          <h3>Personal information</h3>

          <dl className="staffology-field-grid">
            <StaffologyField
              label="Title"
              value={employee.title}
            />
            <StaffologyField
              label="First name"
              value={employee.firstName}
            />
            <StaffologyField
              label="Middle name"
              value={employee.middleName}
            />
            <StaffologyField
              label="Last name"
              value={employee.lastName}
            />
            <StaffologyField
              label="Date of birth"
              value={employee.dateOfBirth}
            />
            <StaffologyField
              label="Gender"
              value={employee.gender}
            />
            <StaffologyField
              label="Marital status"
              value={employee.maritalStatus}
            />
            <StaffologyField
              label="Previous surname"
              value={employee.previousSurname}
            />
            <StaffologyField
              label="NI number"
              value={employee.niNumber}
            />
            <StaffologyField
              label="Passport number"
              value={employee.passportNumber}
            />
          </dl>
        </section>

        <section>
          <h3>Contact information</h3>

          <dl className="staffology-field-grid">
            <StaffologyField
              label="Email"
              value={employee.email}
              wide
            />
            <StaffologyField
              label="Alternative email"
              value={employee.alternativeEmail}
              wide
            />
            <StaffologyField
              label="Telephone"
              value={employee.telephone}
            />
            <StaffologyField
              label="Mobile"
              value={employee.mobile}
            />
          </dl>
        </section>

        <section>
          <h3>Address</h3>

          <dl className="staffology-field-grid">
            <StaffologyField
              label="Address line 1"
              value={address.line1}
              wide
            />
            <StaffologyField
              label="Address line 2"
              value={address.line2}
              wide
            />
            <StaffologyField
              label="Address line 3"
              value={address.line3}
              wide
            />
            <StaffologyField
              label="Town or city"
              value={address.town}
            />
            <StaffologyField
              label="County"
              value={address.county}
            />
            <StaffologyField
              label="Postcode"
              value={address.postcode}
            />
            <StaffologyField
              label="Country"
              value={address.country}
            />
          </dl>
        </section>
      </div>
    </WorkspaceSection>
  );
}

StaffologyBasicDetailsPanel.propTypes = {
  employee: PropTypes.shape({
    title: PropTypes.any,
    firstName: PropTypes.any,
    middleName: PropTypes.any,
    lastName: PropTypes.any,
    dateOfBirth: PropTypes.any,
    gender: PropTypes.any,
    maritalStatus: PropTypes.any,
    previousSurname: PropTypes.any,
    niNumber: PropTypes.any,
    passportNumber: PropTypes.any,
    email: PropTypes.any,
    alternativeEmail: PropTypes.any,
    telephone: PropTypes.any,
    mobile: PropTypes.any,
    address: PropTypes.object,
  }).isRequired,
};
