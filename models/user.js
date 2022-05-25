const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  subOnNewsletter: {
    type: Boolean,
    default: false,
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", usersSchema);
