import inboxService from "../services/inbox-service.js";
import { responseFormat } from "../utils/helper.js";

const inboxController = {
  // GET /inbox
  async getUserInbox(req, res) {
    try {
      const inboxes = await inboxService.getUserInbox(req.user.id, req.query);
      res.status(200).json(responseFormat("success", inboxes, "Inbox fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/:id
  async getInboxById(req, res) {
    try {
      const inbox = await inboxService.getInboxById(req.params.id, req.user.id);
      res.status(200).json(responseFormat("success", inbox, "Inbox fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/unread-count
  async getUnreadCount(req, res) {
    try {
      const count = await inboxService.getUnreadCount(req.user.id);
      res
        .status(200)
        .json(responseFormat("success", { count }, "Unread count fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/unread-count-by-type
  async getUnreadCountByType(req, res) {
    try {
      const counts = await inboxService.getUnreadCountByType(req.user.id);
      res
        .status(200)
        .json(
          responseFormat("success", counts, "Unread count by type fetched"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/thread/:threadId
  async getThread(req, res) {
    try {
      const thread = await inboxService.getThread(
        req.params.threadId,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", thread, "Thread fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/starred
  async getStarredInbox(req, res) {
    try {
      const inboxes = await inboxService.getStarredInbox(req.user.id);
      res
        .status(200)
        .json(responseFormat("success", inboxes, "Starred inbox fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /inbox/archived
  async getArchivedInbox(req, res) {
    try {
      const inboxes = await inboxService.getArchivedInbox(
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", inboxes, "Archived inbox fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /inbox
  async createInbox(req, res) {
    try {
      const inbox = await inboxService.createInbox({
        ...req.body,
        senderId: req.user.id,
      });
      res.status(201).json(responseFormat("success", inbox, "Inbox created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /inbox/send-message
  async sendDirectMessage(req, res) {
    try {
      const inbox = await inboxService.sendDirectMessage(req.user.id, req.body);
      res.status(201).json(responseFormat("success", inbox, "Message sent"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /inbox/:id/reply
  async replyToInbox(req, res) {
    try {
      const inbox = await inboxService.replyToInbox(
        req.params.id,
        req.user.id,
        req.body,
      );
      res.status(201).json(responseFormat("success", inbox, "Reply sent"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /inbox/:id/read
  async markAsRead(req, res) {
    try {
      const inbox = await inboxService.markAsRead(req.params.id, req.user.id);
      res.status(200).json(responseFormat("success", inbox, "Marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /inbox/read-all
  async markAllAsRead(req, res) {
    try {
      const result = await inboxService.markAllAsRead(
        req.user.id,
        req.body.type,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "All marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /inbox/:id/star
  async toggleStar(req, res) {
    try {
      const inbox = await inboxService.toggleStar(req.params.id, req.user.id);
      res.status(200).json(responseFormat("success", inbox, "Star toggled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /inbox/:id/archive
  async archiveInbox(req, res) {
    try {
      const inbox = await inboxService.archiveInbox(req.params.id, req.user.id);
      res.status(200).json(responseFormat("success", inbox, "Archived"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /inbox/:id/unarchive
  async unarchiveInbox(req, res) {
    try {
      const inbox = await inboxService.unarchiveInbox(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", inbox, "Unarchived"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /inbox/:id
  async deleteInbox(req, res) {
    try {
      const inbox = await inboxService.deleteInbox(req.params.id, req.user.id);
      res.status(200).json(responseFormat("success", inbox, "Inbox deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /inbox/multiple-delete
  async deleteMultipleInbox(req, res) {
    try {
      const result = await inboxService.deleteMultipleInbox(
        req.body.ids,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Inboxes deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /inbox/:id/permanent
  async permanentDelete(req, res) {
    try {
      const inbox = await inboxService.permanentDelete(
        req.params.id,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", inbox, "Inbox permanently deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default inboxController;
