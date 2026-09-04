import documentService from "../services/document-service.js";
import { responseFormat } from "../utils/helper.js";

const documentController = {
  // GET /documents
  async getAllDocuments(req, res) {
    try {
      const documents = await documentService.getAllDocuments(
        req.query.workspaceId,
        req.query,
      );
      res
        .status(200)
        .json(responseFormat("success", documents, "All documents fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // GET /documents/:id
  async getDocumentById(req, res) {
    try {
      const document = await documentService.getDocumentById(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", document, "Document fetched"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // POST /documents
  async createDocument(req, res) {
    try {
      const document = await documentService.createDocument(
        req.body.workspaceId,
        req.body,
        req.user.id,
      );
      res
        .status(201)
        .json(responseFormat("success", document, "Document created"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PUT /documents/:id
  async updateDocument(req, res) {
    try {
      const document = await documentService.updateDocument(
        parseInt(req.params.id),
        req.body,
        req.user.id,
      );
      res
        .status(200)
        .json(responseFormat("success", document, "Document updated"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // DELETE /documents/:id
  async deleteDocument(req, res) {
    try {
      const document = await documentService.deleteDocument(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", document, "Document deleted"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /documents/:id/archive
  async archiveDocument(req, res) {
    try {
      const document = await documentService.archiveDocument(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", document, "Document archived"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // PATCH /documents/:id/restore
  async restoreDocument(req, res) {
    try {
      const document = await documentService.restoreDocument(
        parseInt(req.params.id),
      );
      res
        .status(200)
        .json(responseFormat("success", document, "Document restored"));
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default documentController;
