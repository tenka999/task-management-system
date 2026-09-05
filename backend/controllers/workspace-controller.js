import workspaceService from "../services/workspace-service.js";
import { responseFormat } from "../utils/helper.js";

const workspaceController = {
  // GET /workspaces
  async getAllWorkspaces(req, res) {
    try {
      const workspaces = await workspaceService.getAllWorkspaces(
        req.user.id,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", workspaces, "All workspaces fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /workspaces/:id
  async getWorkspaceById(req, res) {
    try {
      const workspace = await workspaceService.getWorkspaceById(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", workspace, "Workspace fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  // GET /workspaces/:slug
  async getWorkspaceBySlug(req, res) {
    try {
      const workspace = await workspaceService.getWorkspaceBySlug(
        req.params.slug,
      );
      res
        .status(200)
        .json(responseFormat("success", workspace, "Workspace fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /workspaces
  async createWorkspace(req, res) {
    try {
      const workspace = await workspaceService.createWorkspace(
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", workspace, "Workspace created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /workspaces/:id
  async updateWorkspace(req, res) {
    console.log(req.body);
    console.log(req.file);
    try {
      const workspace = await workspaceService.updateWorkspace(
        req.params.id,
        req.body,
        req.file?.filename,
      );
      res
        .status(200)
        .json(responseFormat("success", workspace, "Workspace updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /workspaces/:id
  async deleteWorkspace(req, res) {
    try {
      const workspace = await workspaceService.deleteWorkspace(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", workspace, "Workspace deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /workspaces/:id/members
  async getWorkspaceMembers(req, res) {
    try {
      const members = await workspaceService.getWorkspaceMembers(req.params.id);
      res
        .status(200)
        .json(responseFormat("success", members, "Workspace members fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /workspaces/:id/members
  async addWorkspaceMember(req, res) {
    try {
      const member = await workspaceService.addWorkspaceMember(req.params.id, {
        ...req.body,
        invitedById: req.user.id,
      });
      res.status(201).json(responseFormat("success", member, "Member added"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /workspaces/:id/members/:userId
  async updateWorkspaceMember(req, res) {
    try {
      const member = await workspaceService.updateWorkspaceMember(
        req.params.id,
        req.params.userId,
        req.body,
      );
      res.status(200).json(responseFormat("success", member, "Member updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /workspaces/:id/members/:userId
  async removeWorkspaceMember(req, res) {
    try {
      const result = await workspaceService.removeWorkspaceMember(
        req.params.id,
        req.params.userId,
      );
      res.status(200).json(responseFormat("success", result, "Member removed"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /workspaces/:id/invite
  async inviteMember(req, res) {
    try {
      const invitation = await workspaceService.inviteMember(
        req.params.id,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", invitation, "Invitation sent"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default workspaceController;
