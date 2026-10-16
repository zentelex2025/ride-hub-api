import express from "express";
import { user_controller } from "../controller/index.js";
import user_validator from "../lib/validator-schema/user-validation-schema.js";
import expressValidator from "../middleware/express-validator.js";
import verifyTokenMiddleware from "../middleware/verify-token-middleware.js";
import verifyOtpMiddleware from "../middleware/verify-otp-middleware.js";
import verifyEmailOtpMiddleware from "../middleware/verify-email-otp-middleware.js";
import verifyUserIsOtpVerified from "../middleware/user-otp-verified.js";
import admin_controller from "../controller/admin-controller.js";
import authorizationMiddleware from "../middleware/authorization-middleware.js";
import super_admin_controller from "../controller/super-admin-controller.js";
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
  verifyEmailOtpMiddleware,
  user_controller.userVerifyOtp,
);

router.patch(
  "/users/forgot-password",
  verifyTokenMiddleware,
  verifyUserIsOtpVerified,
  user_controller.forgotPassword,
);

// Admin routes

router.post(
  "/admin",
  verifyTokenMiddleware,
  authorizationMiddleware(["all", "user"])("create"),
  admin_controller.createAdmin,
);

router.post("/super-admin", super_admin_controller.createSuperAdmin);
router.post("/admin-login", verifyTokenMiddleware, admin_controller.loginAdmin);

export default router;
