export const PAYROLL_WORKFLOW_STAGES = Object.freeze([
  {
    id: 'employee-selection',
    label: 'Employee Selection',
    status: 'available',
  },
  {
    id: 'calculation',
    label: 'Calculation',
    status: 'available',
  },
  {
    id: 'validation',
    label: 'Validation',
    status: 'available',
  },
  {
    id: 'approval',
    label: 'Approval',
    status: 'available',
  },
  {
    id: 'fps-preparation',
    label: 'FPS Preparation',
    status: 'foundation',
  },
]);

export function getPayrollWorkflowSummary() {
  const available = PAYROLL_WORKFLOW_STAGES.filter(
    (stage) => stage.status === 'available'
  ).length;

  return Object.freeze({
    total: PAYROLL_WORKFLOW_STAGES.length,
    available,
    foundation:
      PAYROLL_WORKFLOW_STAGES.length - available,
  });
}
