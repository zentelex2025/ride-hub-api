import logger from "../config/logger.js";
import bookingService from "../services/booking-service.js";

const booking_controller = {
  requestBooking: async (req, res, next) => {
    try {
      const booking_info = req.body;

      await bookingService.createRequestBooking(booking_info);

      logger.info("New booking created successfully");

      res.status(201).send({
        success: true,
        message: "booking created successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default booking_controller;
