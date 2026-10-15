import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rental_plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RentalPlan",
      required: true,
    },

    start_date: {
      type: Date,
      required: true,
    },

    start_time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },

    dropoff_date: {
      type: Date,
      required: true,
    },

    dropoff_time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):[0-5]\d$/,
    },

    total_amount_need_to_pay: {
      type: Number,
      required: true,
      min: 0,
    },

    paid_amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    deposit_amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    booking_status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

bookingSchema.index({
  vehicle_id: 1,
  start_date: 1,
  booking_status: 1,
});

bookingSchema.index({
  user_id: 1,
  booking_status: 1,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
