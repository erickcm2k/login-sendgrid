const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
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
  tries: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "enabled",
  },
});

module.exports = mongoose.model("User", UserSchema);
