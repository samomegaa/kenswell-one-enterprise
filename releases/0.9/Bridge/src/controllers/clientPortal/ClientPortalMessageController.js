const {
  portalMessageService,
} = require('../../services/clientPortal');

const {
  auditService,
  AUDIT_EVENTS,
  AUDIT_ACTOR_TYPES,
} = require('../../audit');

const {
  notificationService,
  NOTIFICATION_TYPES,
} = require('../../notifications');

class ClientPortalMessageController {
  async sendClientMessage(req, res) {
    try {
      const message = await portalMessageService.sendMessage({
        firmId: req.clientPortal.firmId,
        clientId: req.clientPortal.clientId,
        matterId: req.body.matterId,
        senderType: 'client',
        senderId: req.clientPortal.accountId,
        subject: req.body.subject,
        body: req.body.body,
      });

      await auditService.logFromRequest(req, AUDIT_EVENTS.MESSAGE_SENT, {
        actorType: AUDIT_ACTOR_TYPES.CLIENT,
        clientId: req.clientPortal.clientId,
        resourceType: 'portal_message',
        resourceId: message.id,
      });

      await notificationService.queueInApp({
        firmId: message.firmId,
        clientId: message.clientId,
        recipientType: 'staff',
        type: NOTIFICATION_TYPES.MESSAGE_RECEIVED,
        subject: 'New client portal message',
        template: 'message_received',
        payload: {
          messageId: message.id,
          matterId: message.matterId,
          subject: message.subject,
        },
      });

      return res.status(201).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async sendStaffMessage(req, res) {
    try {
      const message = await portalMessageService.sendMessage({
        firmId: req.body.firmId,
        clientId: req.body.clientId,
        matterId: req.body.matterId,
        senderType: 'staff',
        senderId: req.body.senderId,
        subject: req.body.subject,
        body: req.body.body,
      });

      await auditService.log(AUDIT_EVENTS.MESSAGE_SENT, {
        firmId: message.firmId,
        clientId: message.clientId,
        userId: req.body.senderId,
        actorType: AUDIT_ACTOR_TYPES.STAFF,
        actorId: req.body.senderId,
        resourceType: 'portal_message',
        resourceId: message.id,
        metadata: {
          matterId: message.matterId,
        },
      });

      await notificationService.queueEmail({
        firmId: message.firmId,
        clientId: message.clientId,
        recipientType: 'client',
        recipientId: message.clientId,
        type: NOTIFICATION_TYPES.MESSAGE_RECEIVED,
        subject: 'New secure message',
        template: 'secure_message_received',
        payload: {
          messageId: message.id,
          matterId: message.matterId,
          subject: message.subject,
        },
      });

      return res.status(201).json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listClientMessages(req, res) {
    try {
      const messages = await portalMessageService.listClientMessages(
        req.clientPortal.clientId
      );

      return res.json({ messages });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listMatterMessages(req, res) {
    try {
      const messages = await portalMessageService.listMatterMessages(
        req.params.matterId
      );

      return res.json({ messages });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listUnreadClientMessages(req, res) {
    try {
      const messages = await portalMessageService.listUnreadClientMessages(
        req.clientPortal.clientId
      );

      return res.json({
        count: messages.length,
        messages,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async markMessageRead(req, res) {
    try {
      const message = await portalMessageService.markMessageRead(
        req.params.messageId
      );

      return res.json({ message });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async archiveMessage(req, res) {
    try {
      const message = await portalMessageService.archiveMessage(
        req.params.messageId
      );

      return res.json({
        message,
        reason: req.body.reason || null,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ClientPortalMessageController();
