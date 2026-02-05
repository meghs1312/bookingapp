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


module.exports = {
  bookAppointment,
  getMyAppointments
};
