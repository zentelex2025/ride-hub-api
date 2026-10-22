import logger from "../config/logger.js";
import generateToken from "../lib/token.js";
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
      const admin_data = req.body;
      const admin_info = await adminService.login(admin_data);

      const access_token = generateToken.accessToken(admin_info);
      const refresh_token = generateToken.refreshToken(admin_info);

      await adminService.saveRefreshToken(admin_info, refresh_token);

      logger.info("Admin is logged in");

      res
        .cookie("refresh-token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .cookie("access-token", access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // 1000 millisecond , then 60 second , then 60 minute , then 24 hours , then 7 days
          maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        .status(200)
        .json({ success: true, message: "Admin logged-in successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default admin_controller;
