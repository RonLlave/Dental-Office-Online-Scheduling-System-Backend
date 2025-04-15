const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user ? res.json(user) : res.status(404).json({ error: "User not found" });
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  const updateFields = { name, email, password };

  // Only hash password if it's provided
  // if (password) {
  //   try {
  //     updateFields.password = await bcrypt.hash(password, 10);
  //   } catch (err) {
  //     return res.status(500).json({ error: "Failed to hash password" });
  //   }
  // }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  user
    ? res.json({ message: "Deleted" })
    : res.status(404).json({ error: "User not found" });
};
