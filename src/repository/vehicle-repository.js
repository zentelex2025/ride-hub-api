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

  async markVehicleAsBooked(vehicle_id, updated_data, session) {
    return await VehicleModel.findByIdAndUpdate(
      vehicle_id,
      {
        $set: { ...updated_data },
        $inc: { rents: 1 },
      },
      {
        new: true,
        runValidators: true,
        session,
      },
    );
  }

  async findById(id, session) {
    return await VehicleModel.findById({ _id: id }).session(session);
  }
}

export default new VehicleRepository();
