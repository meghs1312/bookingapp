const express = require("express");
const router = express.Router();

const { auth, isProvider } = require("../middleware/authMiddleware");

const {
  createSlot,
  getAvailableSlots
} = require("../controllers/slotController");

router.post("/", auth, isProvider, createSlot);
router.get("/:serviceId", getAvailableSlots);

module.exports = router;
