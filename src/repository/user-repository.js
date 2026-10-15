import UserModel from "../model/user-model.js";
import logger from "../config/logger.js";

class UserRepository {
  async createNewUser(user_data) {
    logger.info(`create user : user-repository argument  data `);
    return await UserModel.create({ ...user_data });
  }
  async findByOne(email) {
    return await UserModel.findOne({ email });
  }
  async findById(id) {
    return await UserModel.findById({ _id: id });
  }
  async refreshToken(user_info) {
    return await user_info.save();
  }

  async findByOneByEmail(email) {
    return await UserModel.findOne({ email });
  }
  async updateUserEmailOtp(id, hashed_otp) {
    logger.info(
      `user-repository updateUserEmailOtp id : ${id}, hashed-value : ${hashed_otp}`,
    );
    return await UserModel.findByIdAndUpdate(
      id,
      {
        $set: {
          email_otp: hashed_otp,
          email_otp_created_at: new Date(),
          email_otp_expires_at: new Date(Date.now() + 3 * 60 * 1000),
        },
      },

      { returnDocument: "after" },
    );
  }

  async findByIdAndRemoveOtp(id) {
    return await UserModel.findByIdAndUpdate(id, {
      $set: {
        email_otp: null,
        email_otp_created_at: null,
        email_otp_expires_at: null,
      },
    });
  }
}

export default new UserRepository();
