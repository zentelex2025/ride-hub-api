import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

export default function verifyOtpMiddleware(req, res, next) {
  const is_otp_expire = req.cookies?.["is-otp-expire"];
  const is_new_otp = req.cookies?.["is-new-otp"];
  const verify_email = req.cookies?.["verify-email"];

  try {
    logger.info(
      `verify-otp-middleware is_otp_expire : ${is_otp_expire} is_new_otp : ${is_new_otp}`,
    );
    if (!verify_email || Boolean(verify_email) == false) {
      logger.error("Email is not verified");
      throw new AppError("Email is not verified you can not send the otp", 403);
    }

    req.user = { is_otp_expire, is_new_otp, ...req.user };
    next();
  } catch (error) {
    next(error);
  }
}
