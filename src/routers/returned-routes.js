import express from "express";
import returned_controller from "../controller/returned-controller.js";

const router = express();

router.post("/", returned_controller.returned_vehicle);
export default router;
