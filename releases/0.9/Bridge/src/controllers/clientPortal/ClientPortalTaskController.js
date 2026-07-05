const {
  clientTaskService,
} = require('../../tasks/clientPortal');

class ClientPortalTaskController {
  async createTask(req, res) {
    try {
      const task = await clientTaskService.createTask(req.body);

      return res.status(201).json({ task });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listClientTasks(req, res) {
    try {
      const tasks = await clientTaskService.listClientTasks(
        req.clientPortal.clientId
      );

      return res.json({ tasks });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listOpenClientTasks(req, res) {
    try {
      const tasks = await clientTaskService.listOpenClientTasks(
        req.clientPortal.clientId
      );

      return res.json({
        count: tasks.length,
        tasks,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listMatterTasks(req, res) {
    try {
      const tasks = await clientTaskService.listMatterTasks(req.params.matterId);

      return res.json({ tasks });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async completeTask(req, res) {
    try {
      const task = await clientTaskService.completeTask(
        req.params.taskId,
        req.clientPortal.accountId
      );

      return res.json({ task });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async cancelTask(req, res) {
    try {
      const task = await clientTaskService.cancelTask(req.params.taskId);

      return res.json({ task });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalTaskController();
