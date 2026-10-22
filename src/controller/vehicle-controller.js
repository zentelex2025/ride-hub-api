import logger from "../config/logger.js";
import vehicleService from "../services/vehicle-service.js";

const vehicle_controller = {
  create: async (req, res, next) => {
    try {
      const { id } = req.user;
      const vehicle_info = req.body;

      await vehicleService.createVehicle(id, vehicle_info);

      logger.info("New vehicle created successfully");

      res
        .status(201)
        .send({
          success: true,
          message: "vehicle created successfully",
          data: null,
        });
    } catch (error) {
      next(error);
    }
  },
};

export default vehicle_controller;
