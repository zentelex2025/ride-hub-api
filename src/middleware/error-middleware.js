import logger from "../config/logger.js";

export default function errorHandler(err, req, res, next) {
  let status = err?.statusCode;
  let message = err?.message;

  // need to handle the error properly later , this is not working yet
  if (err.code == 11000) {
    status = 409;
  }

  logger.fatal(`catch error-middleware.js `, err);
  res.status(status ?? 500).json({
    success: false,
    message: message,
  });
}
