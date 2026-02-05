const express = require("express");
const router = express.Router();

const { auth, isProvider } = require("../middleware/authMiddleware");

const {
  createSlot,
  getAvailableSlots,
  getMySlots,
  deleteSlot
} = require("../controllers/slotController");

router.post("/", auth, isProvider, createSlot);
router.get("/my", auth, isProvider, getMySlots);
router.get("/:serviceId", getAvailableSlots);
router.delete("/:id", auth, isProvider, deleteSlot);

module.exports = router;
