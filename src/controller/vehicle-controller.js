import logger from "../config/logger.js";
import vehicleService from "../services/vehicle-service.js";

const vehicle_controller = {
  create: async (req, res, next) => {
    try {
      const { id } = req.user;
      const vehicle_info = req.body;

      await vehicleService.createVehicle(id, vehicle_info);

      logger.info("New vehicle created successfully");

      res.status(201).send({
        success: true,
        message: "vehicle created successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  getVehicle: async (req, res, next) => {
    try {
      const { id } = req.user;
      const vehicle_data = await vehicleService.get(id);
      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: vehicle_data,
      });
    } catch (error) {
      next(error);
    }
  },

  updateVehicle: async (req, res, next) => {
    try {
      const { vehicle_id } = req.params;
      const vehicle_new_data = req.body;

      await vehicleService.updateVehicle(vehicle_id, vehicle_new_data);

      res.status(200).json({
        success: true,
        message: "data updated successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default vehicle_controller;
