import mongoose from "mongoose";

const super_admin_schema = new mongoose.Schema(
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
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "super-admin",
      immutable: true,
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

const SuperAdmin = mongoose.model("SuperAdmin", super_admin_schema);

export default SuperAdmin;
