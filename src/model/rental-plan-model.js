import mongoose from "mongoose";

const rentalPlanSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    vehicle_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true,
      },
    ],
    hourly_rent_price: {
      type: Number,
      required: true,
      min: 0,
    },

    weekly_rent_price: {
      type: Number,
      required: true,
      min: 0,
    },

    monthly_rent_price: {
      type: Number,
      required: true,
      min: 0,
    },

    daily_rent_price: {
      type: Number,
      required: true,
      min: 0,
    },

    late_fee_fine_hourly: {
      type: Number,
      default: 0,
      min: 0,
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

const RentalPlanModel = mongoose.model("RentalPlan", rentalPlanSchema);

export default RentalPlanModel;
