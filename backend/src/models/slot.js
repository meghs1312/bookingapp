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
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },

  isBooked: {
    type: Boolean,
    default: false
  }
});


// ✅ ADD THIS (MOST IMPORTANT)
slotSchema.index(
  { provider: 1, date: 1, startTime: 1 },
  { unique: true }
);

module.exports = mongoose.model("Slot", slotSchema);
