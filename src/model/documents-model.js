import mongoose from "mongoose";

const documentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    aadhaar_card_image: {
      type: String,
    },

    pan_card_image: {
      type: String,
    },

    license_image: {
      type: String,
    },

    license_type: {
      type: String,
      enum: ["TWO-WHEELER", "FOUR-WHEELER", "BOTH"],
      default: "BOTH",
    },

    aadhaar_rejection_reason: {
      type: String,
      default: null,
      maxlength: 300,
    },

    pan_rejection_reason: {
      type: String,
      default: null,
      maxlength: 300,
    },

    license_rejection_reason: {
      type: String,
      default: null,
      maxlength: 300,
    },

    aadhaar_status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    pan_status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    license_status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const DocumentsModel = mongoose.model("Documents", documentsSchema);

export default DocumentsModel;
