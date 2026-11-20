import RentalPlanModel from "../model/rental-plan-model.js";

class RentalPlanRepository {
  async createPlan(plan_info) {
    return await RentalPlanModel.create({ ...plan_info });
  }
  async getAllPlans() {
    return await RentalPlanModel.find({ is_deleted: false });
  }
  async getRentalPlansWithVehicles() {
    return await RentalPlanModel.find({ is_deleted: false }).populate({
      path: "vehicle_id",
      match: { is_deleted: false },
    });
  }
  async findById(id, session) {
    return await RentalPlanModel.findById({ _id: id }).session(session);
  }
}

export default new RentalPlanRepository();
