import BookingModel from "../model/booking-model.js";

class BookingRepository {
  async create(user_info, session) {
    return await BookingModel.create([{ ...user_info }], { session });
  }
}

export default new BookingRepository();
