import superAdminService from "../services/super-admin-service.js";

const super_admin_controller = {
  createSuperAdmin: async (req, res, next) => {
    try {
      const super_admin_info = req.body;
      await superAdminService.create(super_admin_info);

      res
        .status(201)
        .json({
          success: true,
          message: "super-admin created successfully",
          data: null,
        });
    } catch (error) {
      next(error);
    }
  },
};

export default super_admin_controller;
