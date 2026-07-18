'use strict';
const { success } = require('../http/api-response');
function asyncRoute(handler) { return (req,res,next) => Promise.resolve(handler(req,res,next)).catch(next); }
function createEmployerRoutes({ express, employerService, employeeService, workspaceService } = {}) {
  const router = express.Router();
  router.get('/employers', asyncRoute(async (req,res) => {
    const employers = await employerService.list({ refresh: req.query.refresh === 'true' });
    return res.status(200).json(success(employers,{ count: employers.length }));
  }));
  router.get('/employers/:employerId', asyncRoute(async (req,res) => {
    return res.status(200).json(success(await employerService.get(req.params.employerId)));
  }));
  router.get('/employers/:employerId/employees', asyncRoute(async (req,res) => {
    await employerService.get(req.params.employerId);
    const employees = await employeeService.list(req.params.employerId);
    return res.status(200).json(success(employees,{ count: employees.length, employerId: req.params.employerId }));
  }));
  router.get('/employers/:employerId/employees/:employeeId', asyncRoute(async (req,res) => {
    await employerService.get(req.params.employerId);
    const employee = await employeeService.get(req.params.employerId, req.params.employeeId);
    return res.status(200).json(success(employee));
  }));
  router.get('/employers/:employerId/employees/:employeeId/workspace', asyncRoute(async (req,res) => {
    await employerService.get(req.params.employerId);
    const workspace = await workspaceService.get(req.params.employerId, req.params.employeeId);
    return res.status(200).json(success(workspace));
  }));
  return router;
}
module.exports = { createEmployerRoutes };
