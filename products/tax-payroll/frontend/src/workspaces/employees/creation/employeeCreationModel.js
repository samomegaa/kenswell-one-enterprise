export const CREATION_STEPS = Object.freeze([
  { id: 'identity', label: 'Identity' },
  { id: 'employment', label: 'Employment' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'tax', label: 'Tax & NI' },
  { id: 'pension', label: 'Pension' },
  { id: 'review', label: 'Review' },
]);

export const INITIAL_EMPLOYEE = Object.freeze({
  identity: {
    title: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
  },
  employment: {
    payrollCode: '',
    jobTitle: '',
    department: '',
    startDate: '',
    status: 'active',
    isDirector: false,
  },
  payroll: {
    payFrequency: 'monthly',
    salary: '',
    hourlyRate: '',
    normalHours: '',
    paymentMethod: 'bacs',
  },
  tax: {
    taxCode: '1257L',
    taxBasis: 'cumulative',
    starterDeclaration: '',
  },
  nationalInsurance: {
    number: '',
    category: 'A',
  },
  pension: {
    autoEnrolmentStatus: 'not_assessed',
    schemeId: '',
    employeeContribution: '',
    employerContribution: '',
  },
});

export function cloneInitialEmployee() {
  return JSON.parse(JSON.stringify(INITIAL_EMPLOYEE));
}

export function employeeDisplayName(draft) {
  return [draft.identity.firstName, draft.identity.lastName]
    .filter(Boolean)
    .join(' ') || 'New employee';
}
