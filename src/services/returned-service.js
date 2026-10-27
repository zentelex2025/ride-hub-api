import logger from "../config/logger.js";
import AppError from "../utils/error-class.js";
import returnedRepository from "../repository/returned-repository.js";
import bookingRepository from "../repository/booking-repository.js";
import mongoose from "mongoose";
import vehicleRepository from "../repository/vehicle-repository.js";

class ReturnedService {
  constructor(returnedRepository, bookingRepository, vehicleRepository) {
    this.returnedRepository = returnedRepository;
    this.bookingRepository = bookingRepository;
    this.vehicleRepository = vehicleRepository;
  }

  async processVehicleReturn(id, returned_info) {
    const session = await mongoose.startSession();

    try {
      let returned_vehicle;

      await session.withTransaction(async () => {
        const is_booking = await this.bookingRepository.findBookingById(
          returned_info.booking_id,
          session,
        );

        const { vehicle_id } = is_booking;

        if (!is_booking || is_booking.is_deleted) {
          throw new AppError("Booking id is not found", 404);
        }

        returned_info.created_by = id;

        returned_vehicle = await this.returnedRepository.create(
          returned_info,
          session,
        );

        const updated_vehicle = { vehicle_status: "available" };
        await this.vehicleRepository.update(vehicle_id, updated_vehicle);
      });

      return returned_vehicle;
    } catch (error) {
      logger.error("catch returned-service processVehicleReturn", error);

      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        error.message ?? "Server failed to return the vehicle",
        500,
      );
    } finally {
      await session.endSession();
    }
  }
}

// need to check the booking - id , is genuine or not
// find booking-id nd from there we will find vehicle id and then we update

export default new ReturnedService(
  returnedRepository,
  bookingRepository,
  vehicleRepository,
);
