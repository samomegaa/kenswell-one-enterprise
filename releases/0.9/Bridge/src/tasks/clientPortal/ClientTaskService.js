const {
  clientTaskRepository,
} = require('../../repositories/tasks');

const {
  notificationService,
  NOTIFICATION_TYPES,
} = require('../../notifications');

const {
  auditService,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  CLIENT_TASK_STATUS,
} = require('./task.constants');

class ClientTaskService {
  async createTask(data) {
    const task = await clientTaskRepository.create({
      firmId: data.firmId,
      clientId: data.clientId,
      matterId: data.matterId || null,
      title: data.title,
      description: data.description || null,
      type: data.type || 'general',
      status: data.status || CLIENT_TASK_STATUS.OPEN,
      priority: data.priority || 'normal',
      dueAt: data.dueAt || null,
      assignedByUserId: data.assignedByUserId || null,
      metadata: data.metadata || {},
    });

    await notificationService.queueEmail({
      firmId: task.firmId,
      clientId: task.clientId,
      recipientType: 'client',
      recipientId: task.clientId,
      type: NOTIFICATION_TYPES.SYSTEM_ALERT,
      subject: 'New client portal task',
      template: 'client_task_created',
      payload: {
        taskId: task.id,
        title: task.title,
        matterId: task.matterId,
        dueAt: task.dueAt,
      },
    });

    await auditService.log('client_task_created', {
      firmId: task.firmId,
      clientId: task.clientId,
      userId: data.assignedByUserId || null,
      actorType: AUDIT_ACTOR_TYPES.STAFF,
      actorId: data.assignedByUserId || null,
      resourceType: 'client_task',
      resourceId: task.id,
      metadata: {
        title: task.title,
        matterId: task.matterId,
      },
    });

    return task;
  }

  async listClientTasks(clientId) {
    return clientTaskRepository.findByClient(clientId, {
      order: [['createdAt', 'DESC']],
    });
  }

  async listOpenClientTasks(clientId) {
    return clientTaskRepository.findOpenByClient(clientId, {
      order: [['dueAt', 'ASC']],
    });
  }

  async listMatterTasks(matterId) {
    return clientTaskRepository.findByMatter(matterId, {
      order: [['createdAt', 'DESC']],
    });
  }

  async completeTask(taskId, completedByAccountId) {
    const task = await clientTaskRepository.markCompleted(taskId, completedByAccountId);

    await auditService.log('client_task_completed', {
      firmId: task.firmId,
      clientId: task.clientId,
      actorType: AUDIT_ACTOR_TYPES.CLIENT,
      actorId: completedByAccountId,
      resourceType: 'client_task',
      resourceId: task.id,
      metadata: {
        matterId: task.matterId,
      },
    });

    return task;
  }

  async cancelTask(taskId) {
    return clientTaskRepository.cancel(taskId);
  }
}

module.exports = ClientTaskService;
