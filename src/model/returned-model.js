import mongoose from "mongoose";

const returnedSchema = new mongoose.Schema(
  {
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },

    penalty_amount: {
      type: Number,
      default: 0,
      min: 0,
    },

    settled_pay: {
      type: Number,
      default: 0,
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

const ReturnedModel = mongoose.model("Returned", returnedSchema);

export default ReturnedModel;
