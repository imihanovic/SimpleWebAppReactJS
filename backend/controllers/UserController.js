const User = require("../models/UserModel.js");
const {
  registerValidation,
  loginValidation,
} = require("../validation.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "User with email exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User(req.body);
  user.password = hashPassword;

  try {
    const savedUser = await user.save();

    res.status(200).json(savedUser._id);
  } catch (error) {
    res.status(404).json({ error: "IVANA" });
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({ error: "User with email does not exist" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Not valid password" });

  const token = jwt.sign({ id: user._id }, "secret");

  res.status(200).json({
    _id: user._id,
    email: req.body.email,
    token: token,
    role: user.role,
  });
};

const getAll = async (req, res) => {
  try {
    let producers = await User.find().sort({ name: 1 });

    res.status(200).json(producers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    let updated = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const editPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid current password.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAll,
  update,
  getById,
  editPassword
};
