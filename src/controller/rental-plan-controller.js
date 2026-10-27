import logger from "../config/logger.js";
import rentalPlanService from "../services/rental-plan-service.js";

const rental_plan_controller = {
  createPlan: async (req, res, next) => {
    try {
      const { id } = req.user;
      const plan_info = req.body;

      await rentalPlanService.createNewPlan(id, plan_info);

      logger.info("New plan created successfully");

      res.status(201).send({
        success: true,
        message: "plan created successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
  getPlan: async (req, res, next) => {
    try {
      const all_rental_plans = await rentalPlanService.getPlan();

      res.status(200).send({
        success: true,
        message: "plan fetched successfully",
        data: all_rental_plans,
      });
    } catch (error) {
      next(error);
    }
  },
  deletePlan: async () => {},
  changePlan: async () => {},
};

export default rental_plan_controller;
