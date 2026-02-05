const Slot = require("../models/slot");

const createSlot = async (req, res) => {
  try {
    const slot = await Slot.create({
      ...req.body,
      provider: req.user.id
    });

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAvailableSlots = async (req, res) => {
  const slots = await Slot.find({
    service: req.params.serviceId,
    isBooked: false
  });

  res.json(slots);
};

module.exports = {
  createSlot,
  getAvailableSlots
};
