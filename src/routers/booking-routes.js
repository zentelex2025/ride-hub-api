import express from "express";
import booking_controller from "../controller/booking-controller.js";

const router = express();

router.post("/request", booking_controller.requestBooking);
// router.get("/", booking_controller.get);

export default router;
