const Dentist = require("../models/Dentist");

exports.createDentist = async (req, res) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json(dentist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDentists = async (req, res) => {
  const dentists = await Dentist.find();
  // console.log(dentists);
  res.json(dentists);
};

exports.getDentist = async (req, res) => {
  const dentist = await Dentist.findById(req.params.id);
  dentist
    ? res.json(dentist)
    : res.status(404).json({ error: "Dentist not found" });
};

exports.updateDentist = async (req, res) => {
  const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  dentist
    ? res.json(dentist)
    : res.status(404).json({ error: "Dentist not found" });
};

exports.deleteDentist = async (req, res) => {
  const dentist = await Dentist.findByIdAndDelete(req.params.id);
  dentist
    ? res.json({ message: "Deleted" })
    : res.status(404).json({ error: "Dentist not found" });
};
