const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  bookAppointment,
  getMyAppointments
} = require("../controllers/appointmentController");

router.post("/", auth, bookAppointment);
router.get("/my", auth, getMyAppointments);

module.exports = router;
