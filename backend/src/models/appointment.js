const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },

  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot"
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
