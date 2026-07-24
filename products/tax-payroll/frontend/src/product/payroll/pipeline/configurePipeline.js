import { createExecutionQueue } from '../execution';
export function configurePipeline(pipeline, employees = []) {
  const queue = createExecutionQueue(employees.map((employee) => ({
    id: `calculate:${employee.id}`,
    type: 'employee-calculation',
    payload: { employeeId: employee.id, periodId: pipeline.periodId },
  })));
  return Object.freeze({
    ...pipeline, checkpoint: 'employees-loaded', total: queue.length,
    queue, updatedAt: new Date().toISOString(),
  });
}
