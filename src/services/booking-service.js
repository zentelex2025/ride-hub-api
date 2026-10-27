import mongoose from "mongoose";
import logger from "../config/logger.js";
import bookingRepository from "../repository/booking-repository.js";
import rentalPlanRepository from "../repository/rental-plan-repository.js";
import userRepository from "../repository/user-repository.js";
import vehicleRepository from "../repository/vehicle-repository.js";
import AppError from "../utils/error-class.js";
import documentsRepository from "../repository/documents-repository.js";

class BookingService {
  constructor(
    bookingRepository,
    userRepository,
    vehicleRepository,
    rentalPlanRepository,
    documentsRepository,
  ) {
    this.bookingRepository = bookingRepository;
    this.userRepository = userRepository;
    this.vehicleRepository = vehicleRepository;
    this.rentalPlanRepository = rentalPlanRepository;
    this.documentsRepository = documentsRepository;
  }
  async createBooking(id, booking_info) {
    const session = await mongoose.startSession();
    let created_booking;

    try {
      await session.withTransaction(async () => {
        booking_info.created_by = id;

        const is_user_exist = await this.userRepository.findById(
          booking_info.user_id,
          session,
        );

        const is_vehicle_available = await this.vehicleRepository.findById(
          booking_info.vehicle_id,
          session,
        );
        const is_rental_plan = await this.rentalPlanRepository.findById(
          booking_info.rental_plan_id,
          session,
        );
        const is_documents = await this.documentsRepository.findByUserId(
          booking_info.user_id,
          session,
        );

        if (!is_vehicle_available) {
          throw new AppError("Vehicle not found for the provided ID.", 404);
        }
        if (is_vehicle_available.vehicle_status !== "available") {
          throw new AppError("Vehicle is not available .", 404);
        }

        if (!is_user_exist) {
          throw new AppError("User not found for the provided ID.", 404);
        }
        if (!is_user_exist.is_active) {
          throw new AppError("This user account is inactive.", 403);
        }

        if (!is_rental_plan) {
          throw new AppError("Rental plan not found for the provided ID.", 404);
        }
        if (is_rental_plan.is_deleted) {
          throw new AppError("This plan is deleted choose another one.", 410);
        }

        /*Checking for the documents is that perfectly fit or not */
        if (!is_documents) {
          throw new AppError(
            "Documents not found. Please upload your documents.",
            404,
          );
        }

        /*Verification part for the vehicle booking , license verification  */
        if (is_documents.license_status === "pending") {
          throw new AppError(
            "Your driving license verification is pending .",
            403,
          );
        }

        created_booking = await this.bookingRepository.create(
          booking_info,
          session,
        );

        /*updating vehicle model because after booking the status must be booked and the rents must be increment by +1 */
        const updated_vehicle = { vehicle_status: "booked" };
        await this.vehicleRepository.markVehicleAsBooked(
          booking_info.vehicle_id,
          updated_vehicle,
          session,
        );
      });
      return created_booking;
    } catch (error) {
      if (error instanceof AppError) {
        logger.error("catch booking-service createBooking", error);
        throw error;
      }

      logger.error("catch booking-service createBooking", error);
      throw new AppError("Failed to create booking.", 500);
    } finally {
      await session.endSession();
    }
  }
}

export default new BookingService(
  bookingRepository,
  userRepository,
  vehicleRepository,
  rentalPlanRepository,
  documentsRepository,
);

// check the users is available or not first ,
// check the vehicle is available or not
// check the rental-plan is available or not
// while create booking , then we need to change in these places :  vehicle-status : changed , rents: increment+1  occupied ,
// first we need to check the license and it's types then we can proceed with the booking
// then we put to the db
