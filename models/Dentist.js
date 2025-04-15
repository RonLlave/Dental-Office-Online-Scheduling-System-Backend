const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema({
  name: String,
  specialization: String,
});

module.exports = mongoose.model("Dentist", dentistSchema);