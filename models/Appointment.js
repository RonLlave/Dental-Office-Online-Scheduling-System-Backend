// models/appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dentist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dentist",
    required: true,
  },
  date: String, // format: YYYY-MM-DD
  time: String, // format: HH:mm
});

module.exports = mongoose.model("Appointment", appointmentSchema);
