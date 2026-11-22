import express from "express";
import rental_plan_controller from "../controller/rental-plan-controller.js";
import authorizationMiddleware from "../middleware/authorization-middleware.js";
import verifyTokenMiddleware from "../middleware/verify-token-middleware.js";
import expressValidator from "../middleware/express-validator.js";
import create_plan_validator from "../lib/validator-schema/rental-plan/create-plan-validator.js";

const router = express();

router.post(
  "/",
  verifyTokenMiddleware,
  authorizationMiddleware(["super-admin", "admin"])([
    "create , update , delete , fetch",
  ]),
  expressValidator(create_plan_validator),
  rental_plan_controller.createPlan,
);
router.get(
  "/",
  //   authorizationMiddleware(["super-admin", "admin"])([
  //     "create , update , delete , fetch",
  //   ]),
  rental_plan_controller.getPlan,
);

router.get(
  "/rental-plans-with-vehicles",
  rental_plan_controller.getRentalPlansWithVehicles,
);

export default router;
