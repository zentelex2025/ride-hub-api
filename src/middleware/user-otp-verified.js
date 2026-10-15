import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

export default function verifyUserIsOtpVerified(req, res, next) {
  const is_otp_verified = req.cookies?.["otp-verified"];

  logger.info(`user-otp-verified ${is_otp_verified}`);

  try {
    if (!is_otp_verified || is_otp_verified == "false") {
      logger.warn("User otp is not verified");
      throw new AppError("user otp is not verified", 401);
    }

    next();
  } catch (error) {
    logger.error("user-otp-verified ", error);
    next(error);
  }
}
