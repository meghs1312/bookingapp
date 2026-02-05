const Appointment = require("../models/appointment");
const Slot = require("../models/slot");


// BOOK SLOT (customer)
const bookAppointment = async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findById(slotId);

    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: "Slot unavailable" });
    }

    // mark booked
    slot.isBooked = true;
    await slot.save();

    const appointment = await Appointment.create({
      customer: req.user.id,
      provider: slot.provider,
      service: slot.service,
      slot: slot._id
    });

    res.json(appointment);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// MY BOOKINGS (customer)
const getMyAppointments = async (req, res) => {
  const appointments = await Appointment.find({
    customer: req.user.id
  }).populate("slot service provider");

  res.json(appointments);
};

// PROVIDER BOOKINGS (provider)
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

// UPDATE APPOINTMENT STATUS (provider)
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

    // Only allow provider to update their own appointments
    if (appointment.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    appointment.status = status;
    await appointment.save();

    // If cancelled, free up the slot
    if (status === "cancelled") {
      const slot = await Slot.findById(appointment.slot);
      if (slot) {
        slot.isBooked = false;
        await slot.save();
      }
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CANCEL APPOINTMENT (customer)
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only allow customer to cancel their own appointments
    if (appointment.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Can't cancel already cancelled or completed appointments
    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    // Free up the slot
    const slot = await Slot.findById(appointment.slot);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    res.json({ message: "Appointment cancelled successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RESCHEDULE APPOINTMENT (customer)
const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { newSlotId } = req.body;

    const appointment = await Appointment.findById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only allow customer to reschedule their own appointments
    if (appointment.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Can't reschedule cancelled appointments
    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Cannot reschedule cancelled appointment" });
    }

    // Check if new slot is available
    const newSlot = await Slot.findById(newSlotId);
    if (!newSlot || newSlot.isBooked) {
      return res.status(400).json({ message: "New slot unavailable" });
    }

    // Verify new slot is for the same service
    if (newSlot.service.toString() !== appointment.service.toString()) {
      return res.status(400).json({ message: "New slot must be for the same service" });
    }

    // Free up old slot
    const oldSlot = await Slot.findById(appointment.slot);
    if (oldSlot) {
      oldSlot.isBooked = false;
      await oldSlot.save();
    }

    // Book new slot
    newSlot.isBooked = true;
    await newSlot.save();

    // Update appointment
    appointment.slot = newSlotId;
    appointment.status = "pending"; // Reset to pending for provider approval
    await appointment.save();

    const updatedAppointment = await Appointment.findById(id).populate("slot service provider");

    res.json({ message: "Appointment rescheduled successfully", appointment: updatedAppointment });
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
