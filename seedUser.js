const mongoose = require("mongoose");
require("dotenv").config();

// Dentist Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // You should hash this with bcrypt
});

const User = mongoose.model("User", userSchema);

// Sample Dentists
const sampleUsers = [
  {
    name: "Ron Cymond Llave",
    email: "roncymondllave25@gmail.com",
    password: "12345",
  },
];

// Connect and seed
async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany(); // Optional: clears existing data
    await User.insertMany(sampleUsers);

    console.log("🌱 User seeded successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding User:", err);
  }
}

seedUsers();
