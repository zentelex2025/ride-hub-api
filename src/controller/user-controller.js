import logger from "../config/logger.js";
import userService from "../services/user-service.js";

const user_controller = {
  createUser: async (req, res, next) => {
    try {
      const data = req.body;
      logger.info(`create user : requested data `);
      await userService.create(data);

      logger.info(`new user is created `);
      res
        .status(201)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      logger.error(`catch user_controller ${error}`);
      next(error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const user_data = req.body;
      await userService.login(user_data);

      logger.info("user is logged in");
      res
        .status(200)
        .json({ success: true, message: "User logged-in successfully" });
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
    } catch (error) {}
  },
  deleteUser: async (req, res, next) => {
    try {
    } catch (error) {}
  },
};

export default user_controller;
