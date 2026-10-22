import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 15,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 50,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "super-admin"],
      default: "admin",
      required: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },

    refresh_token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
