import mongoose from "mongoose";

const user_model = new mongoose.Schema(
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

    profile_image: {
      type: String,
      default: null,
    },

    address: [
      {
        full_address: {
          type: String,
          required: true,
          trim: true,
          maxlength: 100,
        },

        city: {
          type: String,
          required: true,
          trim: true,
          maxlength: 30,
        },

        state: {
          type: String,
          required: true,
          trim: true,
          maxlength: 25,
        },
      },
    ],

    user_type: {
      type: String,
      enum: ["B2B", "B2C"],
      required: true,
    },

    organization_name: {
      type: String,
      trim: true,
      required: function () {
        return this.user_type === "B2B";
      },
      maxlength: 50,
    },

    working_for: {
      type: String,
      trim: true,
      required: function () {
        return this.user_type === "B2C";
      },
      maxlength: 50,
    },
    documents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Documents",
      default: null,
    },

    managed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
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
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", user_model);

export default UserModel;
