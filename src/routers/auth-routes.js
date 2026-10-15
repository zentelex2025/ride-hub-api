import express from "express";
import { user_controller } from "../controller/index.js";
import user_validator from "../lib/validator-schema/user-validation-schema.js";
import expressValidator from "../middleware/express-validator.js";
import verifyTokenMiddleware from "../middleware/verify-token-middleware.js";
import verifyOtpMiddleware from "../middleware/verify-otp-middleware.js";
const router = express();

router.post(
  "/users",
  expressValidator(user_validator),
  user_controller.createUser,
);
router.post("/users/login", user_controller.loginUser);
router.post(
  "/users/email-verify",
  verifyTokenMiddleware,
  user_controller.userEmailVerification,
);
router.post(
  "/users/send-otp",
  verifyTokenMiddleware,
  verifyOtpMiddleware,
  user_controller.userSendOtp,
);
router.post(
  "/users/verify-otp",
  verifyTokenMiddleware,
  user_controller.userVerifyOtp,
);

export default router;
