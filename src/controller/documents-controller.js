import documentsService from "../services/documents-service.js";

const documents_controller = {
  create: async (req, res, next) => {
    try {
      const { id } = req.user;
      const documents_info = req.body;

      await documentsService.createDocuments(id, documents_info);

      res.status(201).json({
        success: true,
        message: "Documents uploaded successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default documents_controller;
