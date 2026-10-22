import logger from "../config/logger.js";
import adminRepository from "../repository/admin-repository.js";
import AppError from "../utils/error-class.js";
import { compareHashedValue, generateHashValue } from "../utils/hashing.js";

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

  async login(admin_data) {
    try {
      const { email, password } = admin_data;
      const admin_info = await this.adminRepository.findByOne(email);

      logger.info(`admin info ${admin_info}`);
      if (!admin_info)
        throw new AppError("Please provide a valid email address", 400);

      if (!compareHashedValue(password, admin_info.password)) {
        throw new AppError("Please provide a valid password", 400);
      }

      return await admin_info;
    } catch (error) {
      logger.error(`catch admin-service.js login`, error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("admin service failed", 500);
    }
  }

  async saveRefreshToken(admin_info, refresh_token) {
    try {
      admin_info.refresh_token = refresh_token;
      return await this.adminRepository.refreshToken(admin_info);
    } catch (error) {
      logger.error("refresh token is unable to store in data base", error);
      throw new AppError(
        error.message ?? "refresh token failed to save in db",
        500,
      );
    }
  }
}

export default new AdminService(adminRepository);
