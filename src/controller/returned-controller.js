import logger from "../config/logger.js";
import returnedService from "../services/returned-service.js";

const returned_controller = {
  returned_vehicle: async (req, res, next) => {
    try {
      const { id } = req.user;
      const returned_info = req.body;

      await returnedService.processVehicleReturn(id, returned_info);

      logger.info("returning vehicle is successfully created");
      res.status(201).json({
        success: true,
        message: "Vehicle returned successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
export default returned_controller;
