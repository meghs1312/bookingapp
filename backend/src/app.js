const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const slotRoutes = require("./routes/slotRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

// app.use("/api/appointments", appointmentRoutes);


const app = express(); // ✅ MUST come first

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/slots", slotRoutes);
app.use("/api/appointments", appointmentRoutes);

module.exports = app;
