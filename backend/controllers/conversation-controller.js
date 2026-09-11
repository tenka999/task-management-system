import conversationService from "../services/conversation-service.js";
import { responseFormat } from "../utils/helper.js";

const conversationController = {
  // GET /conversation
  async getUserConversations(req, res) {
    try {
      const conversations = await conversationService.getUserConversations(
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(
          responseFormat("success", conversations, "Conversations fetched"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /conversation/:id
  async getConversationById(req, res) {
    try {
      const conversation = await conversationService.getConversationById(
        req.params.id,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", conversation, "Conversation fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /conversation/:id/messages
  async getConversationMessages(req, res) {
    try {
      const messages = await conversationService.getConversationMessages(
        req.params.id,
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", messages, "Messages fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /conversation/unread-count
  async getConversationUnreadCount(req, res) {
    try {
      const count = await conversationService.getConversationUnreadCount(
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", { count }, "Unread count fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /conversation
  async createConversation(req, res) {
    try {
      const conversation = await conversationService.createConversation(
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", conversation, "Conversation created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /conversation/direct/:userId
  async getOrCreateDirectConversation(req, res) {
    try {
      const conversation =
        await conversationService.getOrCreateDirectConversation(
          req.user.id,
          req.params.userId,
          req.body.workspaceId,
        );
      res
        .status(200)
        .json(
          responseFormat("success", conversation, "Direct conversation ready"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /conversation/:id
  async updateConversation(req, res) {
    try {
      const conversation = await conversationService.updateConversation(
        req.params.id,
        req.body,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", conversation, "Conversation updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /conversation/:id/participants
  async addParticipant(req, res) {
    try {
      const participant = await conversationService.addParticipant(
        req.params.id,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", participant, "Participant added"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /conversation/:id/participants/:userId
  async removeParticipant(req, res) {
    try {
      const result = await conversationService.removeParticipant(
        req.params.id,
        req.params.userId,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Participant removed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /conversation/:id/read
  async markAsRead(req, res) {
    try {
      const result = await conversationService.markAsRead(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", result, "Marked as read"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /conversation/:id/pin
  async togglePin(req, res) {
    try {
      const result = await conversationService.togglePin(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", result, "Pin toggled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /conversation/:id/mute
  async toggleMute(req, res) {
    try {
      const result = await conversationService.toggleMute(
        req.params.id,
        req.user.id,
      );
      res.status(200).json(responseFormat("success", result, "Mute toggled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /conversation/:id/archive
  async archiveConversation(req, res) {
    try {
      const result = await conversationService.archiveConversation(
        req.params.id,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Conversation archived"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /conversation/:id/close
  async closeConversation(req, res) {
    try {
      const result = await conversationService.closeConversation(
        req.params.id,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Conversation closed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /conversation/:id
  async deleteConversation(req, res) {
    try {
      const result = await conversationService.deleteConversation(
        req.params.id,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", result, "Conversation deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default conversationController;
