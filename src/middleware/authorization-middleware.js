import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

const authorizationMiddleware =
  (required_role) =>
  (required_permission = true) =>
  (req, res, next) => {
    try {
      logger.info(
        `authorization-middleware required_role : ${required_role} required_permission : ${required_permission}`,
        req.user,
      );

      const { role } = req.user;
      if (!required_role.includes(role) || !required_permission) {
        throw new AppError(
          "The user is not authorized to access this content",
          401,
        );
      }

      logger.info("authorization-middleware user is authorized");

      next();
    } catch (error) {
      logger.error("Role is not authorized");
      next(error);
    }
  };

export default authorizationMiddleware;
