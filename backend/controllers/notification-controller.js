import notificationService from "../services/notification-service.js";
import { responseFormat } from "../utils/helper.js";

const notificationController = {
  // GET /notifications
  async getUserNotifications(req, res) {
    try {
      const notifications = await notificationService.getUserNotifications(
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(
          responseFormat("success", notifications, "Notifications fetched"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /notifications/unread-count
  async getUnreadCount(req, res) {
    try {
      const count = await notificationService.getUnreadCount(req.user.id);
      res
        .status(200)
        .json(responseFormat("success", { count }, "Unread count fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /notifications/:id/read
  async markAsRead(req, res) {
    try {
      const notification = await notificationService.markAsRead(
        parseInt(req.params.id),
        req.user.id,
      );
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            notification,
            "Notification marked as read",
          ),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /notifications/read-all
  async markAllAsRead(req, res) {
    try {
      const result = await notificationService.markAllAsRead(req.user.id);
      res
        .status(200)
        .json(
          responseFormat("success", result, "All notifications marked as read"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /notifications/:id
  async deleteNotification(req, res) {
    try {
      const notification = await notificationService.deleteNotification(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", notification, "Notification deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /notifications/clear-all
  async clearAllNotifications(req, res) {
    try {
      const result = await notificationService.clearAllNotifications(
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "All notifications cleared"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default notificationController;
