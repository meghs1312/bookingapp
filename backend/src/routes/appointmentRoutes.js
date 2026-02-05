const express = require("express");
const router = express.Router();

const { auth, isProvider } = require("../middleware/authMiddleware");
const {
  bookAppointment,
  getMyAppointments,
  getProviderAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  rescheduleAppointment
} = require("../controllers/appointmentController");

router.post("/", auth, bookAppointment);
router.get("/my", auth, getMyAppointments);
router.get("/provider", auth, isProvider, getProviderAppointments);
router.patch("/:id", auth, isProvider, updateAppointmentStatus);
router.delete("/:id", auth, cancelAppointment);
router.patch("/:id/reschedule", auth, rescheduleAppointment);

module.exports = router;
