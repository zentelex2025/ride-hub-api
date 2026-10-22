import VehicleModel from "../model/vehicle-model.js";

class VehicleRepository {
  async createNewVehicle(vehicle_info) {
    return await VehicleModel.create({ ...vehicle_info });
  }
  async getVehicle(id) {
    return await VehicleModel.find({ created_by: id });
  }

  async update(vehicle_id, vehicle_new_data) {
    return await VehicleModel.findByIdAndUpdate(
      vehicle_id,
      {
        $set: { ...vehicle_new_data },
      },
      { new: true, runValidators: true },
    );
  }
}

export default new VehicleRepository();
