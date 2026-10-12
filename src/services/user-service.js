import logger from "../config/logger.js";
import userRepository from "../repository/user-repository.js";
import AppError from "../utils/error-class.js";
import { comparePassword, generateHashValue } from "../utils/hashing.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async create(user_data) {
    try {
      logger.info(`create user: user-service argument  data`);
      let user_information = user_data;

      user_information.password = generateHashValue(
        user_information.password ?? "",
      );

      return await this.userRepository.createNewUser(user_information);
    } catch (error) {
      logger.error(`catch user-service.js login`, error);
      throw new AppError("User service failed", 500);
    }
  }

  async login(user_data) {
    try {
      const { email, password } = user_data;
      const user_info = await this.userRepository.findByOne(email);
      if (!user_info)
        throw new AppError("Please provide a valid email address", 400);

      if (!comparePassword(password, user_info.password)) {
        throw new AppError("Please provide a valid password", 400);
      }

      return user_info;
    } catch (error) {
      logger.error(`catch user-service.js login `, error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("User service failed", 500);
    }
  }
}

export default new UserService(userRepository);
