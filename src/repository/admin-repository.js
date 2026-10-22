import AdminModel from "../model/admin-model.js";

class AdminRepository {
  async createNewAdmin(admin_info) {
    await AdminModel.create({ ...admin_info });
  }

  async findByOne(email) {
    return await AdminModel.findOne({ email });
  }

  async refreshToken(admin_info) {
    return await admin_info.save();
  }
}

export default new AdminRepository();
