import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    brand_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    manpower: {
      type: Number,
      required: true,
      min: 1,
    },

    purchase_date_of_vehicle: {
      type: Date,
      required: true,
    },

    model_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    torque: {
      type: Number,
      required: true,
      min: 0,
    },

    top_speed: {
      type: Number,
      required: true,
      min: 0,
    },

    mileage: {
      type: Number,
      required: true,
      min: 0,
    },

    gear_box: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },

    brakes: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },

    suspension: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },

    fuel_capacity: {
      type: Number,
      required: true,
      min: 0,
    },

    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    ground_clearance: {
      type: Number,
      required: true,
      min: 0,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    vehicle_image: {
      type: [String],
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    price: {
      type: Number,
      default: 0,
      min: 0,
    },

    premium: {
      type: Boolean,
      default: false,
    },

    airbags: {
      type: Number,
      default: 0,
      min: 0,
    },

    vehicle_status: {
      type: String,
      enum: ["AVAILABLE", "BOOKED", "RENTED", "IN_REPAIR", "UNAVAILABLE"],
      default: "AVAILABLE",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },

    rents: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const VehicleModel = mongoose.model("Vehicle", vehicleSchema);

export default VehicleModel;
