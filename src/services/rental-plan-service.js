import rentalPlanRepository from "../repository/rental-plan-repository.js";
import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";

class RentalPlanServices {
  constructor(rentalPlanRepository) {
    this.rentalPlanRepository = rentalPlanRepository;
  }
  async createNewPlan(id, plan_info) {
    try {
      plan_info.created_by = id;

      return await this.rentalPlanRepository.createPlan(plan_info);
    } catch (error) {
      logger.error("catch rental-plan-service createNewPlan", error);
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
}

export default new RentalPlanServices(rentalPlanRepository);
