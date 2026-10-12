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
}

export default new UserRepository();
