import logger from "../config/logger.js";
import transporter from "../lib/nodemailer.js";
import AppError from "./error-class.js";

export default async function sendEmail(user_email, otp) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user_email,
      subject: "OTP send to forgot password @zentelex",
      text: otp,
    });

    return;
  } catch (error) {
    logger.error("catch send-email.js", error);
    throw new AppError("Email failed to send otp", 500);
  }
}
