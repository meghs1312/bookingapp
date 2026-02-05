const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  date: Date,
  startTime: String,
  endTime: String,

  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Slot", slotSchema);
