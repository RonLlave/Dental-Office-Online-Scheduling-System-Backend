const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//'http://localhost:3001/api/appointments/user?userId='
exports.getAppointmentsByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const appointments = await Appointment.find({ user: userId }).populate(
      "dentist",
      "name"
    );
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments by user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAppointment = async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("userId")
    .populate("dentistId");
  appointment
    ? res.json(appointment)
    : res.status(404).json({ error: "Appointment not found" });
};

exports.updateAppointment = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  appointment
    ? res.json(appointment)
    : res.status(404).json({ error: "Appointment not found" });
};

exports.cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookedSlots = async (req, res) => {
  const { dentistId, date } = req.query;
  try {
    const appointments = await Appointment.find({ dentist: dentistId, date });
    const bookedTimes = appointments.map((app) => app.time); // assuming time is stored like "09:00 AM"
    res.json(bookedTimes);
  } catch (error) {
    console.error("Error fetching booked times:", error);
    res.status(500).json({ message: "Error fetching booked times" });
  }
};
