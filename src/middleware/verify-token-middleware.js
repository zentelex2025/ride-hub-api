import jwt from "jsonwebtoken";
import AppError from "../utils/error-class.js";

export default function verifyTokenMiddleware(req, res, next) {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return next(new AppError("Unauthorized. No token provided.", 404));
  }

  try {
    // Verifying the access-token
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      return next(
        new AppError("secret key is changes , malicious attack appear", 401),
      );
    }
    if (error.message === "jwt expired") {
      return next(new AppError("jwt token is expired ", 401));
    }
    next(error);
  }
}
