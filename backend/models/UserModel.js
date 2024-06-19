const mongoose = require("mongoose");
const { userRole } = require("../enums/UserRole.js");
const { userStatus } = require("../enums/UserStatus.js");

const baseOption = {
  discriminatorKey: "type",
  collection: "users",
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 10,
      max: 255,
    },
    password: {
      type: String,
      max: 1024,
      min: 6,
    },
    role:{
      type: String,
      enum: Object.values(userRole),
      default: userRole.User,
    },
    state: {
      type: String,
      enum: Object.values(userStatus),
      default: userStatus.Active,
    },
  },
  baseOption
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
