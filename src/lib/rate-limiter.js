import rate_limiting from "express-rate-limit";
import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

const limiter = rate_limiting({
  windowMs: 15 * 60 * 1000,
  max: 12,
  message: "Too many requests from this IP, please try again after 15 minutes",

  handler: (req, res) => {
    logger.warn("Rate limit exceeded");
    throw new AppError("Too many requests at same time", 429);
  },
});

export default limiter;
