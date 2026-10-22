import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";
import vehicleRepository from "../repository/vehicle-repository.js";
import base64ToUrl from "../utils/base64-to-url.js";

class VehicleService {
  constructor(vehicleRepository) {
    this.vehicleRepository = vehicleRepository;
  }

  async createVehicle(id, vehicle_info) {
    try {
      const image_url = await base64ToUrl(vehicle_info.vehicle_image);
      vehicle_info.vehicle_image = image_url;
      vehicle_info.created_by = id;

      return await this.vehicleRepository.createNewVehicle(vehicle_info);
    } catch (error) {
      logger.error("vehicle-service create-vehicle", error);
      throw new AppError(
        error.message ?? "server failed to add new vehicle to the list",
        500,
      );
    }
  }
}

export default new VehicleService(vehicleRepository);
