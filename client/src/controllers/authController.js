const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userFactory = require('../patterns/userFactory');

// POST /api/auth/register
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Factory pattern to assign user role
    const userObj = userFactory(role, name, email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: userObj.name,
      email: userObj.email,
      password: hashedPassword,
      role: userObj.role
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

// POST /api/auth/login
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { registerUser, loginUser };
