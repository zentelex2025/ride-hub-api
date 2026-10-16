import logger from "../config/logger.js";
import superAdminRepository from "../repository/super-admin-repository.js";
import AppError from "../utils/error-class.js";

class SuperAdminService {
  constructor(superAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async create(super_admin_info) {
    try {
      return await this.superAdminRepository.createSuperAdmin(super_admin_info);
    } catch (error) {
      logger.error("failed to create super-admin", error);
      throw new AppError(error.message ?? "failed to create super-admin", 500);
    }
  }
}

export default new SuperAdminService(superAdminRepository);
