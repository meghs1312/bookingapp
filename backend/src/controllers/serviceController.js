const Service = require("../models/Service");


// CREATE
const createService = async (req, res) => {
  try {
    const { name, description, duration } = req.body;

    const service = await Service.create({
      name,
      description,
      duration,
      provider: req.user.id
    });

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().populate("provider", "name email");
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET MY
const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user.id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE
const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};


module.exports = {
  createService,
  getAllServices,
  getMyServices,
  deleteService
};
