export const EMPLOYEE_SELECTION_CONTRACT = Object.freeze({
  collectionKeys: Object.freeze([
    'employees',
    'payrollEmployees',
    'employeeList',
    'workers',
    'people',
  ]),
  fields: Object.freeze({
    id: Object.freeze([
      'id',
      'employeeId',
      'externalEmployeeId',
      'reference',
    ]),
    firstName: Object.freeze([
      'firstName',
      'forename',
      'givenName',
    ]),
    lastName: Object.freeze([
      'lastName',
      'surname',
      'familyName',
    ]),
    displayName: Object.freeze([
      'displayName',
      'name',
      'fullName',
    ]),
    reference: Object.freeze([
      'employeeReference',
      'payrollReference',
      'reference',
      'id',
    ]),
    status: Object.freeze([
      'status',
      'employmentStatus',
      'state',
    ]),
    included: Object.freeze([
      'includedInPayroll',
      'included',
      'selected',
    ]),
  }),
});
