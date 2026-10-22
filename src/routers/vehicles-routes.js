import express from "express";
import vehicle_controller from "../controller/vehicle-controller.js";
import verifyTokenMiddleware from "../middleware/verify-token-middleware.js";
import authorizationMiddleware from "../middleware/authorization-middleware.js";

const router = express();

router.post("/", vehicle_controller.create);
export default router;
