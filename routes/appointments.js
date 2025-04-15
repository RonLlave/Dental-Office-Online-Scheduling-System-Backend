const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/bookedslots", appointmentController.getBookedSlots);
router.get("/user", appointmentController.getAppointmentsByUser);
router.post("/", appointmentController.createAppointment);
router.get("/:id", appointmentController.getAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.cancelAppointment);

// GET /api/appointments/slots?dentistId=XXX&date=YYYY-MM-DD

module.exports = router;
