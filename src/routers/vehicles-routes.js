import express from "express";
import vehicle_controller from "../controller/vehicle-controller.js";

const router = express();

router.post("/", vehicle_controller.create);
router.get("/", vehicle_controller.getVehicle);
router.patch("/:vehicle_id", vehicle_controller.updateVehicle);
export default router;
