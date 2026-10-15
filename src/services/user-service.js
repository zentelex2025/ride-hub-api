import logger from "../config/logger.js";
import userRepository from "../repository/user-repository.js";
import AppError from "../utils/error-class.js";
import { comparePassword, generateHashValue } from "../utils/hashing.js";
import sendEmail from "../utils/send-email.js";
import crypto from "node:crypto";

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
      logger.error(`catch user-service.js login`, error);
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError("User service failed", 500);
    }
  }

  async saveRefreshToken(user_info, refresh_token) {
    try {
      user_info.refresh_token = refresh_token;
      return await this.userRepository.refreshToken(user_info);
    } catch (error) {
      logger.error("refresh token is unable to store in data base", error);
      throw new AppError("refresh token failed to save in db", 500);
    }
  }

  async verifyEmail(email) {
    try {
      const is_email = await this.userRepository.findByOneByEmail(email);
      if (!is_email) {
        throw new AppError("Email not found", 404);
      }

      return true;
    } catch (error) {
      logger.error("catch user-service.js verifyEmail", error);
      throw new AppError(error.message ?? "user service failed", 500);
    }
  }

  async sendOtp(id, email) {
    try {
      logger.info(`user-service sendOtp id : ${id} email : ${email}`);
      const otp = crypto.randomInt(100000, 999999).toString();
      await sendEmail(email, otp);
      logger.info("otp successfully send to the user email");

      const hashed_otp = generateHashValue(otp);

      return await this.userRepository.updateUserEmailOtp(id, hashed_otp);
    } catch (error) {
      logger.error("catch user-service.js sendOtp", error);
      throw new AppError(error.message ?? "failed to send otp", 500);
    }
  }
}

export default new UserService(userRepository);
