import express from "express";
import { user_controller } from "../controller/index.js";
import user_validator from "../lib/validator-schema/user-validation-schema.js";
import expressValidator from "../middleware/express-validator.js";
const router = express();

router.post(
  "/users",
  expressValidator(user_validator),
  user_controller.createUser,
);
router.get("/users", user_controller.loginUser);

export default router;
