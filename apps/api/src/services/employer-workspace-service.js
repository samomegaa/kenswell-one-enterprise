'use strict';
class EmployerWorkspaceService {
  constructor({ employeeService, createWorkspaceService } = {}) {
    if (!employeeService?.get) throw new TypeError('Employer-scoped employee service is required');
    if (typeof createWorkspaceService !== 'function') throw new TypeError('Workspace service factory is required');
    this.employeeService = employeeService;
    this.createWorkspaceService = createWorkspaceService;
  }
  async get(employerId, employeeId) {
    const scopedEmployeeService = { get: () => this.employeeService.get(employerId, employeeId) };
    const workspaceService = this.createWorkspaceService({ employeeService: scopedEmployeeService });
    return workspaceService.get(employeeId);
  }
}
module.exports = { EmployerWorkspaceService };
