const Appointment = require("../models/appointment");
const Slot = require("../models/slot");


const bookAppointment = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, isBooked: false },
      { $set: { isBooked: true } },
      { new: true }
    );

    if (!slot) {
      return res.status(400).json({ message: "Slot unavailable" });
    }

    const appointment = await Appointment.create({
      customer: req.user.id,
      provider: slot.provider,
      service: slot.service,
      slot: slot._id,
      status: "pending"
    });

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    customer: req.user.id
  }).populate("slot service provider");

  res.json(appointments);
};


const getProviderAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      provider: req.user.id
    }).populate("customer service slot");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    appointment.status = status;
    await appointment.save();

    if (status === "cancelled") {
      await Slot.findByIdAndUpdate(appointment.slot, {
        $set: { isBooked: false }
      });
    }

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    await Slot.findByIdAndUpdate(appointment.slot, {
      $set: { isBooked: false }
    });

    res.json({ message: "Appointment cancelled successfully", appointment });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newSlotId } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (appointment.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Cannot reschedule cancelled appointment" });
    }

    const newSlot = await Slot.findOneAndUpdate(
      { _id: newSlotId, isBooked: false },
      { $set: { isBooked: true } },
      { new: true }
    );

    if (!newSlot) {
      return res.status(400).json({ message: "New slot unavailable" });
    }

    await Slot.findByIdAndUpdate(appointment.slot, {
      $set: { isBooked: false }
    });

    appointment.slot = newSlotId;
    appointment.status = "pending";
    await appointment.save();

    const updated = await Appointment.findById(id)
      .populate("slot service provider");

    res.json({
      message: "Appointment rescheduled successfully",
      appointment: updated
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  bookAppointment,
  getMyAppointments,
  getProviderAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment
};
