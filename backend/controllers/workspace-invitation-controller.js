import invitationService from "../services/workspace-invitation-service.js";
import { responseFormat } from "../utils/helper.js";

const invitationController = {
  // GET /invitation?workspaceId=xxx
  async getAllInvitations(req, res) {
    try {
      const { workspaceId } = req.query;
      console.log("query", req.query);
      const invitations = await invitationService.getAllInvitations(
        workspaceId,
        req.query,
      );
      res
        .status(200)
        .json(
          responseFormat("success", invitations, "All invitations fetched"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /invitation/:id
  async getInvitationById(req, res) {
    try {
      const invitation = await invitationService.getInvitationById(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /invitation/token/:token
  async getInvitationByToken(req, res) {
    try {
      const invitation = await invitationService.getInvitationByToken(
        req.params.token,
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /invitation/pending/:workspaceId
  async getPendingInvitations(req, res) {
    try {
      const invitations = await invitationService.getPendingInvitations(
        req.params.workspaceId,
      );
      res
        .status(200)
        .json(
          responseFormat("success", invitations, "Pending invitations fetched"),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /invitation/email/:email
  async getInvitationsByEmail(req, res) {
    try {
      const invitations = await invitationService.getInvitationsByEmail(
        req.params.email,
      );
      res
        .status(200)
        .json(
          responseFormat(
            "success",
            invitations,
            "Invitations by email fetched",
          ),
        );
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /invitation
  async createInvitation(req, res) {
    try {
      const invitation = await invitationService.createInvitation(
        req.body.workspaceId,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", invitation, "Invitation created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /invitation/:id/resend
  async resendInvitation(req, res) {
    try {
      const invitation = await invitationService.resendInvitation(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation resent"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /invitation/accept/:token
  async acceptInvitation(req, res) {
    try {
      const invitation = await invitationService.acceptInvitation(
        req.params.token,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation accepted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /invitation/decline/:token
  async declineInvitation(req, res) {
    try {
      const invitation = await invitationService.declineInvitation(
        req.params.token,
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation declined"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /invitation/:id
  async cancelInvitation(req, res) {
    try {
      const invitation = await invitationService.cancelInvitation(
        parseInt(req.params.id),
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation cancelled"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /invitation/:id/delete
  async deleteInvitation(req, res) {
    try {
      const invitation = await invitationService.deleteInvitation(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", invitation, "Invitation deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default invitationController;
