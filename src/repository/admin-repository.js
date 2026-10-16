import AdminModel from "../model/admin-model.js";

class AdminRepository {
  async createNewAdmin(admin_info) {
    await AdminModel.create({ ...admin_info });
  }
}

export default new AdminRepository();
