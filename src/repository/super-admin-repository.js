import SuperAdmin from "../model/super-admin-model.js";

class SuperAdminRepository {
  async createSuperAdmin(super_admin_info) {
    return await SuperAdmin.create({ ...super_admin_info });
  }
}

export default new SuperAdminRepository();
