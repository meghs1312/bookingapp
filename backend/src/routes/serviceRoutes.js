const express = require("express");
const router = express.Router();

const {
  createService,
  getAllServices,
  getMyServices,
  deleteService
} = require("../controllers/serviceController");

const { auth, isProvider } = require("../middleware/authMiddleware");

router.post("/", auth, isProvider, createService);
router.get("/", getAllServices);
router.get("/my", auth, isProvider, getMyServices);
router.delete("/:id", auth, isProvider, deleteService);

module.exports = router;
