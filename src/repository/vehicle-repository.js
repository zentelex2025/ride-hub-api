import VehicleModel from "../model/vehicle-model.js";

class VehicleRepository {
  async createNewVehicle(vehicle_info) {
    await VehicleModel.create({ ...vehicle_info });
  }
}

export default new VehicleRepository();
