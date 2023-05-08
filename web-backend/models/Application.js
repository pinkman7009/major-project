const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  applicant: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  lawyer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: true,
  },
  problem: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Denied", "Pending"],
    default: "Pending",
  },
  attachment: {
    type: String,
  },
  is_complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Application", ApplicationSchema);
