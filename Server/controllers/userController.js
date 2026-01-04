const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * USER REGISTER
 */
module.exports.userCreate = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(201).json({
      message: 'USER CREATED SUCCESSFULLY',
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * USER LOGIN
 */
module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET ALL USERS
 */
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select('-password');
    return res.status(200).json({
      message: 'Get users successfully',
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE USER BY ID
 */
module.exports.DeleteUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Delete user successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
