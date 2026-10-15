import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

export default function verifyEmailOtpMiddleware(req, res, next) {
  const is_otp_expire = req.cookies?.["is-otp-expire"];
  const is_new_otp = req.cookies?.["is-new-otp"];
  const verify_email = req.cookies?.["verify-email"];

  // cookies store values in string so that'w why i perform the **[operation == false]** for comparing false or true values
  try {
    logger.info(
      `verify-email-otp-middleware is_otp_expire : ${is_otp_expire} is_new_otp : ${is_new_otp} verify_email : ${verify_email}`,
    );

    if (!verify_email || verify_email == "false") {
      logger.error("verify-email-otp-middleware Email is not verified");
      throw new AppError("Email is not verified you can not send the otp", 403);
    } else if (!is_otp_expire) {
      logger.error("verify-email-otp-middleware Otp is not verified");
      throw new AppError("Otp is not verified", 403);
    }
    if (is_otp_expire == "true") {
      logger.error("verify-email-otp-middleware Otp is expired");
      throw new AppError("Otp is expired send again", 410);
    }

    req.user = { is_otp_expire, is_new_otp, verify_email, ...req.user };
    next();
  } catch (error) {
    next(error);
  }
}
