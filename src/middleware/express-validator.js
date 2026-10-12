import { validationResult } from "express-validator";
import AppError from "../utils/error-class.js";
import logger from "../config/logger.js";

const expressValidator = (validator) => {
  return async (req, res, next) => {
    for (const validation of validator) {
      await validation.run(req);
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new AppError(
        errors
          .array()
          .map((item) => item.msg)
          .join(", "),

        400,
      );

      logger.error("Validation schema failed", err);
      return next(err);
    }

    logger.info("Validation schema passed");
    next();
  };
};

export default expressValidator;
