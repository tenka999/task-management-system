import prisma from "../config/database.js";
import notifService from "../services/notif-user-service.js";
import { responseFormat } from "../utils/helper.js";

const notifController = {
  // 🔹 GET ALL (optional admin)
  async getAll(req, res) {
    try {
      const data = await notifService.getAll();
      res.status(200).json(responseFormat("success", data, "Notif fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔹 GET NOTIF USER (dengan filter query)
  async getUserNotif(req, res) {
    console.log("query", req.query);
    try {
      const userId = req.user.id;
      const { status } = req.query;

      const data = await notifService.getNotifUser(userId, status);

      res.status(200).json(responseFormat("success", data, "Notif fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔹 GET NOTIF USER (dengan filter query)

  // 🔹 GET COUNT (badge 🔔)
  async getCount(req, res) {
    try {
      const userId = req.user.id;

      const data = await notifService.getNotifCount(userId);

      res.status(200).json(responseFormat("success", data, "Count fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔹 GET BY ID
  async getById(req, res) {
    try {
      const data = await notifService.getById(Number(req.params.id));

      if (!data) {
        return res
          .status(404)
          .json({ success: false, message: "Notif not found" });
      }

      res.status(200).json(responseFormat("success", data, "Notif fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔹 CREATE (auto detect global / personal)
  async create(req, res) {
    try {
      const data = await notifService.create(req.body);

      res.status(201).json(responseFormat("success", data, "Notif created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔹 UPDATE (notif master)
  async update(req, res) {
    try {
      const data = await notifService.update(Number(req.params.id), req.body);

      res.status(200).json(responseFormat("success", data, "Notif updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 MARK AS READ (1)
  async markAsRead(req, res) {
    try {
      const userId = req.user.id;
      const notifId = Number(req.params.id);

      const data = await notifService.markAsRead(userId, notifId);

      res.status(200).json(responseFormat("success", data, "Marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 MARK AS UNREAD
  async markAsUnread(req, res) {
    try {
      const userId = req.user.id;
      const notifId = Number(req.params.id);

      const data = await notifService.markAsUnread(userId, notifId);

      res.status(200).json(responseFormat("success", data, "Marked as unread"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 MARK ALL AS READ
  async markAllAsRead(req, res) {
    try {
      const userId = req.user.id;

      const data = await notifService.markAllAsRead(userId, req.user.role);

      res
        .status(200)
        .json(responseFormat("success", data, "All marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 BULK MARK AS READ
  async bulkMarkAsRead(req, res) {
    try {
      const userId = req.user.id;
      const { ids } = req.body;

      if (!ids || !ids.length) {
        return res.status(400).json({
          success: false,
          message: "IDs kosong",
        });
      }

      const data = await notifService.bulkMarkAsRead(userId, ids);

      res
        .status(200)
        .json(responseFormat("success", data, "Bulk marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 DELETE 1 (per user)
  async delete(req, res) {
    try {
      const userId = req.user.id;
      const notifId = Number(req.params.id);

      const data = await notifService.deleteNotif(userId, notifId);

      res.status(200).json(responseFormat("success", data, "Notif deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  async softDelete(req, res) {
    const { userId, notifId } = req.params;
    try {
      const data = await notifService.softDeleteNotif(userId, notifId);

      res.status(200).json(responseFormat("success", data, "Notif deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // 🔥 DELETE 1 (per user)
  async deleteMultiple(req, res) {
    const { ids } = req.body;
    try {
      const notifId = Number(req.params.id);

      const data = await notifService.deleteMultipleNotif(userId, notifId);

      res.status(200).json(responseFormat("success", data, "Notif deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🔥 BULK DELETE
  async bulkDelete(req, res) {
    try {
      const userId = req.user.id;
      const { ids } = req.body;

      if (!ids || !ids.length) {
        return res.status(400).json({
          success: false,
          message: "IDs kosong",
        });
      }

      const data = await notifService.bulkDeleteNotif(userId, ids);

      res.status(200).json(responseFormat("success", data, "Bulk deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async bulkSoftDeleteController(req, res) {
    try {
      const userId = req.user.id;
      const { notifIds } = req.body;

      if (!notifIds || !Array.isArray(notifIds)) {
        return res.status(400).json({
          success: false,
          message: "notifIds harus array",
        });
      }

      const result = await notifService.bulkSoftDelete(userId, notifIds);

      return res.json({
        success: true,
        message: "Bulk soft delete berhasil",
        data: result,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  },

  // 🔥 DELETE GLOBAL (ADMIN)
  async deleteGlobal(req, res) {
    try {
      const notifId = Number(req.params.id);

      const data = await notifService.deleteGlobalNotif(notifId);

      res
        .status(200)
        .json(responseFormat("success", data, "Global notif deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default notifController;
