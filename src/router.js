import { Router } from "express";
import { auth_routes } from "./routers/index.js";

export default function createRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).json({ status: "Ok", message: "health is good !" });
  });

  router.use("/auth", auth_routes);

  return router;
}
