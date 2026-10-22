import { Router } from "express";
import { auth_routes, vehicles_routes } from "./routers/index.js";
import verifyTokenMiddleware from "./middleware/verify-token-middleware.js";
import authorizationMiddleware from "./middleware/authorization-middleware.js";

export default function createRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).json({ status: "Ok", message: "health is good !" });
  });

  router.use("/auth", auth_routes);
  router.use(
    "/vehicles",
    verifyTokenMiddleware,
    authorizationMiddleware(["all", "super-admin", "admin"])([
      "create , update , delete , fetch",
    ]),
    vehicles_routes,
  );

  return router;
}
