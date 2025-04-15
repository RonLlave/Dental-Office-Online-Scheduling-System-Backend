const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey"; // Set securely in .env

// Register Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ name, email, password });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = password === user.password;
    // const isMatch = await bcrypt.compare(password, user.password);
    // const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(
    //   isMatch,
    //   " Input Password:",
    //   password,
    //   ", DB Password:",
    //   user.password,
    //   ",  hashed input password: ",
    //   hashedPassword
    // );
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
