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
  }).populate('service');

  res.json(slots);
};

// GET PROVIDER SLOTS
const getMySlots = async (req, res) => {
  try {
    const slots = await Slot.find({
      provider: req.user.id
    }).populate('service');

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SLOT
const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Only allow provider to delete their own slots
    if (slot.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Don't allow deleting booked slots
    if (slot.isBooked) {
      return res.status(400).json({ message: 'Cannot delete booked slot' });
    }

    await Slot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slot deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSlot,
  getAvailableSlots,
  getMySlots,
  deleteSlot
};
