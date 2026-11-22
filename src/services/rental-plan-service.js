import rentalPlanRepository from "../repository/rental-plan-repository.js";
import vehicleRepository from "../repository/vehicle-repository.js";
import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

class RentalPlanServices {
  constructor(rentalPlanRepository, vehicleRepository) {
    this.rentalPlanRepository = rentalPlanRepository;
    this.vehicleRepository = vehicleRepository;
  }
  async createNewPlan(id, plan_info) {
    try {
      const is_vehicle_exist = await this.vehicleRepository.findById(
        plan_info.vehicle_id,
      );

      if (!is_vehicle_exist) {
        throw new AppError("Vehicle not found for the provided ID.", 404);
      }

      if (is_vehicle_exist.is_rental_plan) {
        throw new AppError("Rental plan already exist", 409);
      }
      plan_info.created_by = id;

      const created_plan =
        await this.rentalPlanRepository.createPlan(plan_info);
      await this.vehicleRepository.update(plan_info.vehicle_id, {
        is_rental_plan: true,
      });

      return created_plan;
    } catch (error) {
      logger.error("catch rental-plan-service createNewPlan", error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        error.message ?? "server failed to add new rental plan",
        500,
      );
    }
  }

  async getPlan() {
    try {
      return await this.rentalPlanRepository.getAllPlans();
    } catch (error) {
      logger.error("catch rental-plan-service getPlan", error);
      throw new AppError(
        error.message ?? "server failed to fetch all rented plans",
        500,
      );
    }
  }

  async getRentalPlansWithVehicles() {
    try {
      return await this.rentalPlanRepository.getRentalPlansWithVehicles();
    } catch (error) {
      logger.error(
        "catch rental-plan-service getRentalPlansWithVehicles",
        error,
      );
      throw new AppError(
        error.message ?? "server failed to fetch rental plans with vehicles",
        500,
      );
    }
  }
}

export default new RentalPlanServices(rentalPlanRepository, vehicleRepository);
