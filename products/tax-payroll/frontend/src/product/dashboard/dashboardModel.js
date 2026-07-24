export const DASHBOARD_METRICS = Object.freeze([
  {
    id: 'employers',
    label: 'Employers',
    value: 'Live',
    detail: 'Connected through Staffology',
  },
  {
    id: 'payroll',
    label: 'Payroll',
    value: 'Ready',
    detail: 'Run foundation available',
  },
  {
    id: 'employees',
    label: 'Employees',
    value: 'Available',
    detail: 'Dynamic employee workspaces',
  },
  {
    id: 'rti',
    label: 'RTI',
    value: 'Foundation',
    detail: 'FPS preparation established',
  },
]);

export const DASHBOARD_ACTIONS = Object.freeze([
  {
    id: 'payroll-run',
    title: 'Continue payroll',
    description: 'Open the payroll run operational workspace.',
    status: 'Available',
  },
  {
    id: 'employees',
    title: 'Review employees',
    description: 'Work with Staffology-backed employee records.',
    status: 'Available',
  },
  {
    id: 'rti',
    title: 'Prepare RTI',
    description: 'Continue into FPS preparation and validation.',
    status: 'Foundation',
  },
]);
