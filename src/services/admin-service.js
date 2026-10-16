import logger from "../config/logger.js";
import adminRepository from "../repository/admin-repository.js";
import AppError from "../utils/error-class.js";
import { generateHashValue } from "../utils/hashing.js";

class AdminService {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
  }

  async createAdmin(created_by_id, admin_data) {
    try {
      let admin_information = admin_data;
      admin_data.created_by = created_by_id;

      admin_information.password = generateHashValue(
        admin_information.password ?? "",
      );

      return await this.adminRepository.createNewAdmin(admin_information);
    } catch (error) {
      logger.error("failed to create new admin", error);
      throw new AppError(error?.message ?? "failed to create admin", 500);
    }
  }
}

export default new AdminService(adminRepository);
