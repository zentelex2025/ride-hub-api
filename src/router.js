import { Router } from "express";
import {
  auth_routes,
  booking_routes,
  document_routes,
  rental_plan_routes,
  returned_routes,
  vehicles_routes,
} from "./routers/index.js";
import verifyTokenMiddleware from "./middleware/verify-token-middleware.js";
import authorizationMiddleware from "./middleware/authorization-middleware.js";

export default function createRouter() {
  const router = Router();

  router.get("/", (req, res) => {
    res.status(200).json({ status: "Ok", message: "health is good !" });
  });

  router.use("/auth", auth_routes);
  router.use(
    "/vehicles/",
    verifyTokenMiddleware,
    authorizationMiddleware(["all", "super-admin", "admin"])([
      "create , update , delete , fetch",
    ]),
    vehicles_routes,
  );
  router.use(
    "/rental-plan",
    verifyTokenMiddleware,
    authorizationMiddleware(["super-admin", "admin"])([
      "create , update , delete , fetch",
    ]),
    rental_plan_routes,
  );
  router.use(
    "/booking",
    verifyTokenMiddleware,
    authorizationMiddleware(["super-admin", "admin", "user"])([
      "create , update , delete , fetch",
    ]),
    booking_routes,
  );
  router.use(
    "/documents",
    verifyTokenMiddleware,
    authorizationMiddleware(["super-admin", "user"])(["create"]),
    document_routes,
  );
  router.use(
    "/returned",
    verifyTokenMiddleware,
    authorizationMiddleware(["super-admin", "admin", "user"])(["create"]),
    returned_routes,
  );

  return router;
}
