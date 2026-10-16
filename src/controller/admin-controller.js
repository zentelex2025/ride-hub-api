import logger from "../config/logger.js";
import adminService from "../services/admin-service.js";

const admin_controller = {
  createAdmin: async (req, res, next) => {
    try {
      const admin_data = req.body;
      const { id } = req.user;
      await adminService.createAdmin(id, admin_data);

      logger.info("admin-controller createAdmin Admin is created successfully");
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  },

  loginAdmin: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};

export default admin_controller;
