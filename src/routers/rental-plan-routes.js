import express from "express";
import rental_plan_controller from "../controller/rental-plan-controller.js";

const router = express();

router.post("/", rental_plan_controller.createPlan);
router.get("/", rental_plan_controller.getPlan);

export default router;
