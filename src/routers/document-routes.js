import express from "express";
import documents_controller from "../controller/documents-controller.js";

const router = express();

router.post("/", documents_controller.create);

export default router;
