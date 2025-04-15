const mongoose = require("mongoose");
require("dotenv").config();

// Dentist Schema
const dentistSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availableSlots: [Date],
});

const Dentist = mongoose.model("Dentist", dentistSchema);

// Sample Dentists
const sampleDentists = [
  {
    name: "Dr. Emily Carter",
    specialization: "Orthodontist",
    availableSlots: [
      new Date("2025-04-15T09:00:00Z"),
      new Date("2025-04-15T11:00:00Z"),
    ],
  },
  {
    name: "Dr. Michael Smith",
    specialization: "Pediatric Dentist",
    availableSlots: [
      new Date("2025-04-16T14:00:00Z"),
      new Date("2025-04-16T16:00:00Z"),
    ],
  },
  {
    name: "Dr. Olivia Johnson",
    specialization: "General Dentist",
    availableSlots: [
      new Date("2025-04-17T10:30:00Z"),
      new Date("2025-04-17T12:30:00Z"),
    ],
  },
];

// Connect and seed
async function seedDentists() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Dentist.deleteMany(); // Optional: clears existing data
    await Dentist.insertMany(sampleDentists);

    console.log("🌱 Dentists seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding dentists:", err);
  }
}

seedDentists();
