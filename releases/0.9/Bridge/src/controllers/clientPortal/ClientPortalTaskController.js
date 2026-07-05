const {
  clientTaskService,
} = require('../../tasks/clientPortal');

const {
  respond,
} = require('../../http');

class ClientPortalTaskController {
  async createTask(req, res) {
    try {
      const task = await clientTaskService.createTask(req.body);

      return respond.created(res, { task });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listClientTasks(req, res) {
    try {
      const tasks = await clientTaskService.listClientTasks(
        req.clientPortal.clientId
      );

      return respond.success(res, { tasks });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listOpenClientTasks(req, res) {
    try {
      const tasks = await clientTaskService.listOpenClientTasks(
        req.clientPortal.clientId
      );

      return respond.success(res, {
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async listMatterTasks(req, res) {
    try {
      const tasks = await clientTaskService.listMatterTasks(req.params.matterId);

      return respond.success(res, { tasks });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async completeTask(req, res) {
    try {
      const task = await clientTaskService.completeTask(
        req.params.taskId,
        req.clientPortal.accountId
      );

      return respond.success(res, { task });
    } catch (error) {
      return respond.failure(res, error);
    }
  }

  async cancelTask(req, res) {
    try {
      const task = await clientTaskService.cancelTask(req.params.taskId);

      return respond.success(res, { task });
    } catch (error) {
      return respond.failure(res, error);
    }
  }
}

module.exports = new ClientPortalTaskController();
