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
      vehicle_info.vehicle_sr_no = new Date()
        .toISOString()
        .slice(0, 10)
        .replaceAll("-", ""); // generating the unique serial number every time

      return await this.vehicleRepository.createNewVehicle(vehicle_info);
    } catch (error) {
      logger.error("catch vehicle-service create-vehicle", error);
      throw new AppError(
        error.message ?? "server failed to add new vehicle to the list",
        500,
      );
    }
  }

  async getAllVehicles() {
    try {
      return await this.vehicleRepository.getAllVehiclesUser();
    } catch (error) {
      logger.error("catch vehicle-service getVehicle", error);
      throw new AppError(error.message ?? "failed to fetch vehicle", 500);
    }
  }
  async get(id) {
    try {
      return await this.vehicleRepository.getVehicle(id);
    } catch (error) {
      logger.error("catch vehicle-service getVehicle", error);
      throw new AppError(error.message ?? "failed to fetch vehicle", 500);
    }
  }

  async updateVehicle(vehicle_id, vehicle_new_data) {
    try {
      return this.vehicleRepository.update(vehicle_id, vehicle_new_data);
    } catch (error) {
      logger.error("catch vehicle-service updateVehicle", error);
      throw new AppError(error.message ?? "failed to update vehicle", 500);
    }
  }
}

export default new VehicleService(vehicleRepository);
