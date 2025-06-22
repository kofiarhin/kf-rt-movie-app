// server/models/userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: () => false,
    },
  },
  {
    timestamps: true,
  }
);

// 👇 Prevent model overwrite on hot reloads or watch mode
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
