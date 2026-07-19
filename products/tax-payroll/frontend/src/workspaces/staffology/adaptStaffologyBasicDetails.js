import {
  asRecord,
  firstPath,
  firstValue,
} from './staffologyValueResolver';

function employeeSource(runtimeWorkspace) {
  const workspace = asRecord(
    runtimeWorkspace?.workspace
  );

  return asRecord(
    workspace.employee ||
    workspace.canonicalEmployee ||
    workspace.data?.employee ||
    workspace.data ||
    runtimeWorkspace?.employee
  );
}

function addressFrom(source) {
  return asRecord(
    firstPath(source, [
      'personalDetails.address',
      'basicDetails.address',
      'address',
      'contact.address',
    ])
  );
}

export function adaptStaffologyBasicDetails(
  runtimeWorkspace
) {
  const source = employeeSource(runtimeWorkspace);
  const listed = asRecord(runtimeWorkspace?.employee);
  const address = addressFrom(source);

  const firstName = firstValue(
    firstPath(source, [
      'personalDetails.firstName',
      'basicDetails.firstName',
      'firstName',
      'first',
    ]),
    listed.firstName
  );

  const middleName = firstPath(source, [
    'personalDetails.middleName',
    'basicDetails.middleName',
    'middleName',
  ]);

  const lastName = firstValue(
    firstPath(source, [
      'personalDetails.lastName',
      'basicDetails.lastName',
      'lastName',
      'surname',
      'last',
    ]),
    listed.lastName
  );

  const title = firstPath(source, [
    'personalDetails.title',
    'basicDetails.title',
    'title',
  ]);

  const generatedName = [
    title,
    firstName,
    middleName,
    lastName,
  ].filter(Boolean).join(' ');

  return Object.freeze({
    source,

    id: firstValue(
      source.id,
      source.employeeId,
      listed.id
    ),

    displayName: firstValue(
      source.displayName,
      source.fullName,
      source.name,
      listed.displayName,
      listed.name,
      generatedName,
      'Employee'
    ),

    title,
    firstName,
    middleName,
    lastName,

    dateOfBirth: firstPath(source, [
      'personalDetails.dateOfBirth',
      'basicDetails.dateOfBirth',
      'dateOfBirth',
      'dob',
    ]),

    gender: firstPath(source, [
      'personalDetails.gender',
      'basicDetails.gender',
      'gender',
    ]),

    maritalStatus: firstPath(source, [
      'personalDetails.maritalStatus',
      'basicDetails.maritalStatus',
      'maritalStatus',
    ]),

    email: firstPath(source, [
      'personalDetails.email',
      'basicDetails.email',
      'contact.email',
      'email',
    ]),

    alternativeEmail: firstPath(source, [
      'personalDetails.alternativeEmail',
      'basicDetails.alternativeEmail',
      'alternativeEmail',
    ]),

    telephone: firstPath(source, [
      'personalDetails.telephone',
      'basicDetails.telephone',
      'contact.telephone',
      'telephone',
      'phone',
    ]),

    mobile: firstPath(source, [
      'personalDetails.mobile',
      'basicDetails.mobile',
      'contact.mobile',
      'mobile',
    ]),

    niNumber: firstPath(source, [
      'personalDetails.niNumber',
      'personalDetails.nationalInsuranceNumber',
      'basicDetails.niNumber',
      'niNumber',
      'nationalInsuranceNumber',
    ]),

    previousSurname: firstPath(source, [
      'personalDetails.previousSurname',
      'basicDetails.previousSurname',
      'previousSurname',
    ]),

    passportNumber: firstPath(source, [
      'personalDetails.passportNumber',
      'basicDetails.passportNumber',
      'passportNumber',
    ]),

    address: Object.freeze({
      line1: firstValue(
        address.line1,
        address.address1,
        address.street
      ),
      line2: firstValue(
        address.line2,
        address.address2
      ),
      line3: firstValue(
        address.line3,
        address.address3
      ),
      town: firstValue(
        address.town,
        address.city
      ),
      county: firstValue(
        address.county,
        address.region
      ),
      postcode: firstValue(
        address.postcode,
        address.postCode,
        address.zipCode
      ),
      country: firstValue(
        address.country,
        address.countryCode
      ),
    }),
  });
}
