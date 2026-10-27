import express from "express";
import booking_controller from "../controller/booking-controller.js";

const router = express();

router.post("/", booking_controller.create);
// router.get("/", booking_controller.get);

export default router;
