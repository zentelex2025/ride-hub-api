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
      type: [String],
    },

    pan_card_image: {
      type: String,
    },

    license_image: {
      type: String,
    },

    license_type: {
      type: String,
      enum: ["two-wheeler", "four-wheeler", "both"],
      default: "two-wheeler",
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
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    pan_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    license_status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
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
