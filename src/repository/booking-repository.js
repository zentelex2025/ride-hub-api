import BookingModel from "../model/booking-model.js";

class BookingRepository {
  async create(user_info, session) {
    return await BookingModel.create([{ ...user_info }], { session });
  }

  async findBookingById(id, session) {
    return await BookingModel.findById(id).session(session);
  }
}

export default new BookingRepository();
